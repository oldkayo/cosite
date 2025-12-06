// Admin dashboard functionality (No PHP - uses localStorage)
(function () {
  let allMembers = [];

  // Wait for storage modules
  function waitForStorage(callback) {
    if (window.AdminStorage && window.AuthStorage) {
      callback();
    } else {
      setTimeout(() => waitForStorage(callback), 100);
    }
  }

  // Load members from storage
  function loadMembers() {
    waitForStorage(() => {
      try {
        // Check permissions
        if (!window.AdminStorage.hasPermission('manage_users') && 
            !window.AuthStorage.getCurrentUser()?.role === 'admin') {
          showError("members-tbody", "ليس لديك صلاحية للوصول");
          return;
        }

        allMembers = window.AdminStorage.getMembers();
        // Remove passwords from display
        allMembers = allMembers.map(m => {
          const { password, ...memberWithoutPassword } = m;
          return memberWithoutPassword;
        });
        displayMembers(allMembers);
      } catch (error) {
        console.error("Error loading members:", error);
        showError("members-tbody", "حدث خطأ في تحميل الأعضاء");
      }
    });
  }

  // Display members in table
  function displayMembers(members) {
    const tbody = document.getElementById("members-tbody");
    if (!tbody) return;

    if (members.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="5" class="no-data">لا توجد أعضاء</td></tr>';
      return;
    }

    tbody.innerHTML = members
      .map((member) => {
        const permissions = Array.isArray(member.permissions)
          ? member.permissions.join(", ")
          : "لا توجد";
        const roleNames = {
          member: "عضو عادي",
          editor: "محرر",
          admin: "مدير",
        };

        return `
          <tr>
            <td>${escapeHtml(member.name)}</td>
            <td>${escapeHtml(member.email)}</td>
            <td>
              <span class="role-badge role-${member.role}">${roleNames[member.role] || member.role}</span>
              ${permissions !== "لا توجد" ? `<br><small class="permissions-text">${escapeHtml(permissions)}</small>` : ""}
            </td>
            <td>${member.created_at || "غير محدد"}</td>
            <td>
              <button class="btn btn-small btn-primary" onclick="editMember(${member.id})">
                تعديل
              </button>
              <button class="btn btn-small btn-danger" onclick="deleteMember(${member.id}, '${escapeHtml(member.name)}')">
                حذف
              </button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Add member form handler
  function initAddMemberForm() {
    const form = document.getElementById("add-member-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      waitForStorage(() => {
        const formData = new FormData(form);
        const permissions = Array.from(
          form.querySelectorAll('input[name="permissions[]"]:checked')
        ).map((cb) => cb.value);

        const memberData = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          role: formData.get("role"),
          permissions: permissions,
        };

        const errorDiv = document.getElementById("add-member-error");
        const successDiv = document.getElementById("add-member-success");

        // Clear messages
        if (errorDiv) errorDiv.style.display = "none";
        if (successDiv) successDiv.style.display = "none";

        const result = window.AdminStorage.addMember(memberData);

        if (result.success) {
          if (successDiv) {
            successDiv.textContent = result.message || "تم إضافة العضو بنجاح";
            successDiv.style.display = "block";
          }
          form.reset();
          loadMembers();
          // Switch to members section
          switchSection("members");
        } else {
          if (errorDiv) {
            errorDiv.textContent = result.error || "حدث خطأ أثناء إضافة العضو";
            errorDiv.style.display = "block";
          }
        }
      });
    });
  }

  // Edit member
  window.editMember = function (memberId) {
    waitForStorage(() => {
      const member = allMembers.find((m) => m.id == memberId);
      if (!member) {
        // Reload to get full member data
        const allMembersFull = window.AdminStorage.getMembers();
        const fullMember = allMembersFull.find((m) => m.id == memberId);
        if (!fullMember) return;
        populateEditForm(fullMember);
      } else {
        populateEditForm(member);
      }
    });
  };

  function populateEditForm(member) {
    // Populate edit form
    document.getElementById("edit-member-id").value = member.id;
    document.getElementById("edit-member-name").value = member.name;
    document.getElementById("edit-member-email").value = member.email;
    document.getElementById("edit-member-password").value = "";
    document.getElementById("edit-member-role").value = member.role;

    // Populate permissions checkboxes
    const checkboxesContainer = document.getElementById(
      "edit-permissions-checkboxes"
    );
    if (checkboxesContainer) {
      const permissions = [
        { value: "view_content", label: "عرض المحتوى" },
        { value: "edit_content", label: "تعديل المحتوى" },
        { value: "delete_content", label: "حذف المحتوى" },
        { value: "manage_users", label: "إدارة المستخدمين" },
        { value: "manage_settings", label: "إدارة الإعدادات" },
      ];

      checkboxesContainer.innerHTML = permissions
        .map(
          (perm) => `
          <label class="checkbox-label">
            <input
              type="checkbox"
              name="permissions[]"
              value="${perm.value}"
              ${(member.permissions || []).includes(perm.value) ? "checked" : ""}
            />
            <span>${perm.label}</span>
          </label>
        `
        )
        .join("");
    }

    // Show modal
    const modal = document.getElementById("edit-member-modal");
    if (modal) {
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }
  }

  // Delete member
  window.deleteMember = function (memberId, memberName) {
    if (
      !confirm(
        `هل أنت متأكد من حذف العضو "${memberName}"؟\n\nلا يمكن التراجع عن هذا الإجراء.`
      )
    ) {
      return;
    }

    waitForStorage(() => {
      const result = window.AdminStorage.deleteMember(memberId);

      if (result.success) {
        loadMembers();
        showNotification("تم حذف العضو بنجاح", "success");
      } else {
        showNotification(result.error || "حدث خطأ أثناء الحذف", "error");
      }
    });
  };

  // Edit member form handler
  function initEditMemberForm() {
    const form = document.getElementById("edit-member-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      waitForStorage(() => {
        const formData = new FormData(form);
        const permissions = Array.from(
          form.querySelectorAll('input[name="permissions[]"]:checked')
        ).map((cb) => cb.value);

        const memberData = {
          id: parseInt(formData.get("id")),
          name: formData.get("name"),
          email: formData.get("email"),
          role: formData.get("role"),
          permissions: permissions,
        };

        // Only include password if provided
        const password = formData.get("password");
        if (password && password.trim() !== "") {
          memberData.password = password;
        }

        const errorDiv = document.getElementById("edit-member-error");
        const successDiv = document.getElementById("edit-member-success");

        // Clear messages
        if (errorDiv) errorDiv.style.display = "none";
        if (successDiv) successDiv.style.display = "none";

        const result = window.AdminStorage.updateMember(memberData.id, memberData);

        if (result.success) {
          if (successDiv) {
            successDiv.textContent = result.message || "تم تحديث العضو بنجاح";
            successDiv.style.display = "block";
          }
          loadMembers();
          // Close modal after a short delay
          setTimeout(() => {
            closeEditModal();
          }, 1500);
        } else {
          if (errorDiv) {
            errorDiv.textContent = result.error || "حدث خطأ أثناء التحديث";
            errorDiv.style.display = "block";
          }
        }
      });
    });
  }

  // Close edit modal
  function closeEditModal() {
    const modal = document.getElementById("edit-member-modal");
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
    const form = document.getElementById("edit-member-form");
    if (form) form.reset();
  }

  // Section navigation
  function switchSection(sectionId) {
    // Hide all sections
    document.querySelectorAll(".admin-section").forEach((section) => {
      section.classList.remove("active");
    });

    // Remove active from all nav items
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Show selected section
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
      section.classList.add("active");
    }

    // Activate nav item
    const navItem = document.querySelector(
      `.nav-item[data-section="${sectionId}"]`
    );
    if (navItem) {
      navItem.classList.add("active");
    }
  }

  // Initialize navigation
  function initNavigation() {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        switchSection(section);
      });
    });
  }

  // Modal close handlers
  function initModalHandlers() {
    const modal = document.getElementById("edit-member-modal");
    const closeBtn = document.querySelector("#edit-member-modal .modal-close");
    const cancelBtn = document.getElementById("cancel-edit");

    if (closeBtn) {
      closeBtn.addEventListener("click", closeEditModal);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeEditModal);
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeEditModal();
        }
      });
    }
  }

  // Utility functions
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<tr><td colspan="5" class="error">${message}</td></tr>`;
    }
  }

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Initialize on page load
  document.addEventListener("DOMContentLoaded", function () {
    loadMembers();
    initAddMemberForm();
    initEditMemberForm();
    initNavigation();
    initModalHandlers();

    // Refresh button
    const refreshBtn = document.getElementById("refresh-members");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", loadMembers);
    }
  });
})();
