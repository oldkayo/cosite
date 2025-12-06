// Admin projects management (No PHP - uses localStorage)
(function () {
  let allProjects = [];

  // Wait for storage modules
  function waitForStorage(callback) {
    if (window.ProjectsStorage) {
      callback();
    } else {
      setTimeout(() => waitForStorage(callback), 100);
    }
  }

  // Load projects from storage
  function loadProjects() {
    waitForStorage(() => {
      try {
        allProjects = window.ProjectsStorage.getProjects();
        displayProjects(allProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        showError("projects-tbody", "حدث خطأ في تحميل المشاريع");
      }
    });
  }

  // Display projects in table
  function displayProjects(projects) {
    const tbody = document.getElementById("projects-tbody");
    if (!tbody) return;

    if (projects.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="no-data">لا توجد مشاريع</td></tr>';
      return;
    }

    tbody.innerHTML = projects
      .map((project) => {
        const featured = project.featured ? '✅' : '❌';
        const category = project.category || 'general';
        return `
          <tr>
            <td>${escapeHtml(project.title_ar || '')}</td>
            <td>${escapeHtml(project.title_en || '')}</td>
            <td>${project.date || 'غير محدد'}</td>
            <td>${escapeHtml(category)}</td>
            <td>${featured}</td>
            <td>
              <button class="btn btn-small btn-primary" onclick="editProject('${project.id}')">
                تعديل
              </button>
              <button class="btn btn-small btn-danger" onclick="deleteProject('${project.id}', '${escapeHtml(project.title_ar || project.title_en)}')">
                حذف
              </button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Add project form handler
  function initAddProjectForm() {
    const form = document.getElementById("add-project-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      waitForStorage(() => {
        const formData = new FormData(form);
        
        const projectData = {
          title_ar: formData.get("title_ar"),
          title_en: formData.get("title_en"),
          desc_ar: formData.get("desc_ar"),
          desc_en: formData.get("desc_en"),
          date: formData.get("date") || new Date().toISOString().split('T')[0],
          href: formData.get("href") || 'ourProjects.html',
          img: formData.get("img") || '',
          category: formData.get("category") || 'general',
          featured: formData.get("featured") === 'true'
        };

        const errorDiv = document.getElementById("add-project-error");
        const successDiv = document.getElementById("add-project-success");

        // Clear messages
        if (errorDiv) errorDiv.style.display = "none";
        if (successDiv) successDiv.style.display = "none";

        const result = window.ProjectsStorage.addProject(projectData);

        if (result.success) {
          if (successDiv) {
            successDiv.textContent = result.message || "تم إضافة المشروع بنجاح";
            successDiv.style.display = "block";
          }
          form.reset();
          loadProjects();
          // Switch to projects section
          switchSection("projects");
        } else {
          if (errorDiv) {
            errorDiv.textContent = result.error || "حدث خطأ أثناء إضافة المشروع";
            errorDiv.style.display = "block";
          }
        }
      });
    });
  }

  // Edit project
  window.editProject = function (projectId) {
    waitForStorage(() => {
      const project = allProjects.find((p) => p.id === projectId);
      if (!project) return;

      // Populate edit form
      document.getElementById("edit-project-id").value = project.id;
      document.getElementById("edit-project-title-ar").value = project.title_ar || '';
      document.getElementById("edit-project-title-en").value = project.title_en || '';
      document.getElementById("edit-project-desc-ar").value = project.desc_ar || '';
      document.getElementById("edit-project-desc-en").value = project.desc_en || '';
      document.getElementById("edit-project-date").value = project.date || '';
      document.getElementById("edit-project-category").value = project.category || 'general';
      document.getElementById("edit-project-img").value = project.img || '';
      document.getElementById("edit-project-href").value = project.href || 'ourProjects.html';
      document.getElementById("edit-project-featured").checked = project.featured || false;

      // Show modal
      const modal = document.getElementById("edit-project-modal");
      if (modal) {
        modal.style.display = "flex";
        modal.setAttribute("aria-hidden", "false");
      }
    });
  };

  // Delete project
  window.deleteProject = function (projectId, projectTitle) {
    if (
      !confirm(
        `هل أنت متأكد من حذف المشروع "${projectTitle}"؟\n\nلا يمكن التراجع عن هذا الإجراء.`
      )
    ) {
      return;
    }

    waitForStorage(() => {
      const result = window.ProjectsStorage.deleteProject(projectId);

      if (result.success) {
        loadProjects();
        showNotification("تم حذف المشروع بنجاح", "success");
      } else {
        showNotification(result.error || "حدث خطأ أثناء الحذف", "error");
      }
    });
  };

  // Edit project form handler
  function initEditProjectForm() {
    const form = document.getElementById("edit-project-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      waitForStorage(() => {
        const formData = new FormData(form);
        
        const projectData = {
          title_ar: formData.get("title_ar"),
          title_en: formData.get("title_en"),
          desc_ar: formData.get("desc_ar"),
          desc_en: formData.get("desc_en"),
          date: formData.get("date"),
          href: formData.get("href"),
          img: formData.get("img"),
          category: formData.get("category"),
          featured: formData.get("featured") === 'true'
        };

        const projectId = formData.get("id");
        const errorDiv = document.getElementById("edit-project-error");
        const successDiv = document.getElementById("edit-project-success");

        // Clear messages
        if (errorDiv) errorDiv.style.display = "none";
        if (successDiv) successDiv.style.display = "none";

        const result = window.ProjectsStorage.updateProject(projectId, projectData);

        if (result.success) {
          if (successDiv) {
            successDiv.textContent = result.message || "تم تحديث المشروع بنجاح";
            successDiv.style.display = "block";
          }
          loadProjects();
          // Close modal after a short delay
          setTimeout(() => {
            closeEditProjectModal();
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

  // Close edit project modal
  function closeEditProjectModal() {
    const modal = document.getElementById("edit-project-modal");
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
    const form = document.getElementById("edit-project-form");
    if (form) form.reset();
  }

  // Section navigation (reuse from admin.js if available)
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

  // Modal close handlers
  function initModalHandlers() {
    const modal = document.getElementById("edit-project-modal");
    const closeBtn = document.querySelector("#edit-project-modal .modal-close");
    const cancelBtn = document.getElementById("cancel-edit-project");

    if (closeBtn) {
      closeBtn.addEventListener("click", closeEditProjectModal);
    }

    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeEditProjectModal);
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeEditProjectModal();
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
      element.innerHTML = `<tr><td colspan="6" class="error">${message}</td></tr>`;
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
    loadProjects();
    initAddProjectForm();
    initEditProjectForm();
    initModalHandlers();

    // Refresh button
    const refreshBtn = document.getElementById("refresh-projects");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", loadProjects);
    }
  });
})();

