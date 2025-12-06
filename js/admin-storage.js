// Admin storage functions (No PHP)
(function () {
  // Wait for auth-storage
  function waitForAuthStorage(callback) {
    if (window.AuthStorage) {
      callback();
    } else {
      setTimeout(() => waitForAuthStorage(callback), 100);
    }
  }

  // Get all members
  function getMembers() {
    if (!window.AuthStorage) return [];
    return window.AuthStorage.getMembers();
  }

  // Save members
  function saveMembers(members) {
    if (!window.AuthStorage) return false;
    return window.AuthStorage.saveMembers(members);
  }

  // Add new member
  function addMember(memberData) {
    const members = getMembers();
    
    // Check if email exists
    const emailExists = members.some(
      m => m.email.toLowerCase() === memberData.email.toLowerCase()
    );
    
    if (emailExists) {
      return {
        success: false,
        error: 'البريد الإلكتروني مستخدم بالفعل'
      };
    }

    // Get next ID
    const nextId = members.length > 0 
      ? Math.max(...members.map(m => m.id)) + 1 
      : 1;

    const newMember = {
      id: nextId,
      name: memberData.name.trim(),
      email: memberData.email.trim().toLowerCase(),
      password: memberData.password, // Will be hashed by saveMembers
      role: memberData.role || 'member',
      permissions: memberData.permissions || [],
      created_at: new Date().toISOString().split('T')[0],
      active: true
    };

    members.push(newMember);
    
    if (saveMembers(members)) {
      const { password, ...memberWithoutPassword } = newMember;
      return {
        success: true,
        message: 'تم إضافة العضو بنجاح',
        member: memberWithoutPassword
      };
    } else {
      return {
        success: false,
        error: 'فشل حفظ البيانات'
      };
    }
  }

  // Update member
  function updateMember(memberId, memberData) {
    const members = getMembers();
    const memberIndex = members.findIndex(m => m.id == memberId);

    if (memberIndex === -1) {
      return {
        success: false,
        error: 'العضو غير موجود'
      };
    }

    // Check if email is being changed and if it's already used
    if (memberData.email && 
        memberData.email.toLowerCase() !== members[memberIndex].email.toLowerCase()) {
      const emailExists = members.some(
        (m, idx) => idx !== memberIndex && 
        m.email.toLowerCase() === memberData.email.toLowerCase()
      );
      
      if (emailExists) {
        return {
          success: false,
          error: 'البريد الإلكتروني مستخدم بالفعل'
        };
      }
    }

    // Update member
    if (memberData.name) {
      members[memberIndex].name = memberData.name.trim();
    }
    if (memberData.email) {
      members[memberIndex].email = memberData.email.trim().toLowerCase();
    }
    if (memberData.password && memberData.password.trim() !== '') {
      members[memberIndex].password = memberData.password; // Will be hashed by saveMembers
    }
    if (memberData.role) {
      members[memberIndex].role = memberData.role;
    }
    if (memberData.permissions) {
      members[memberIndex].permissions = memberData.permissions;
    }

    if (saveMembers(members)) {
      const { password, ...updatedMember } = members[memberIndex];
      return {
        success: true,
        message: 'تم تحديث العضو بنجاح',
        member: updatedMember
      };
    } else {
      return {
        success: false,
        error: 'فشل حفظ البيانات'
      };
    }
  }

  // Delete member
  function deleteMember(memberId) {
    const currentUser = window.AuthStorage ? window.AuthStorage.getCurrentUser() : null;
    
    // Prevent deleting yourself
    if (currentUser && currentUser.id == memberId) {
      return {
        success: false,
        error: 'لا يمكنك حذف حسابك الخاص'
      };
    }

    const members = getMembers();
    const memberIndex = members.findIndex(m => m.id == memberId);

    if (memberIndex === -1) {
      return {
        success: false,
        error: 'العضو غير موجود'
      };
    }

    members.splice(memberIndex, 1);

    if (saveMembers(members)) {
      return {
        success: true,
        message: 'تم حذف العضو بنجاح'
      };
    } else {
      return {
        success: false,
        error: 'فشل حفظ البيانات'
      };
    }
  }

  // Check permissions
  function hasPermission(permission) {
    if (!window.AuthStorage) return false;
    const user = window.AuthStorage.getCurrentUser();
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;
    
    return (user.permissions || []).includes(permission);
  }

  // Export functions
  window.AdminStorage = {
    getMembers,
    saveMembers,
    addMember,
    updateMember,
    deleteMember,
    hasPermission
  };
})();

