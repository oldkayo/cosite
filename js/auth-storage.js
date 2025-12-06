// Authentication and Storage System (No PHP required)
(function () {
  const STORAGE_KEY = 'comixdev_members';
  const SESSION_KEY = 'comixdev_session';
  
  // Initialize default admin if no members exist
  async function initializeDefaultAdmin() {
    let members = getMembers();
    
    // If no members in localStorage, try to load from JSON file
    if (members.length === 0) {
      console.log("No members in localStorage, trying to load from JSON file...");
      members = await loadMembersFromFile();
    }
    
    // If still no members, create default admin
    if (members.length === 0) {
      console.log("Creating default admin...");
      const defaultAdmin = {
        id: 1,
        name: "مدير النظام",
        email: "admin@comixdev.com",
        password: "00100kayo", // Will be hashed when saved
        role: "admin",
        permissions: [
          "view_content",
          "edit_content",
          "delete_content",
          "manage_users",
          "manage_settings"
        ],
        created_at: "2024-01-01",
        active: true
      };
      saveMembers([defaultAdmin]);
      console.log("Default admin created and saved");
    } else {
      console.log("Members loaded successfully:", members.length);
    }
  }

  // Simple password hashing (for client-side)
  function hashPassword(password) {
    // Simple hash function (not cryptographically secure, but works for demo)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
  }

  // Verify password
  function verifyPassword(password, storedHash) {
    return hashPassword(password) === storedHash;
  }

  // Get all members from storage
  function getMembers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const members = JSON.parse(stored);
        console.log("Loaded members from localStorage:", members.length);
        return members;
      }
      // If no localStorage, return empty and let initializeDefaultAdmin handle it
      console.log("No members in localStorage, will initialize default admin");
      return [];
    } catch (error) {
      console.error("Error loading members:", error);
      return [];
    }
  }

  // Load members from JSON file (fallback) - not used anymore, kept for compatibility
  async function loadMembersFromFile() {
    try {
      const response = await fetch('data/members.json');
      if (response.ok) {
        const members = await response.json();
        // Save to localStorage for future use
        saveMembers(members);
        return members;
      }
    } catch (error) {
      console.error("Error loading from file:", error);
    }
    return [];
  }

  // Save members to storage
  function saveMembers(members) {
    try {
      // Hash passwords if they're not hashed (check if it's a simple number hash)
      const hashedMembers = members.map(member => {
        if (member.password) {
          // If password doesn't look like a hash (not a number string), hash it
          const isHashed = /^-?\d+$/.test(member.password.toString());
          if (!isHashed) {
            // Password is plain text, hash it
            return {
              ...member,
              password: hashPassword(member.password)
            };
          }
        }
        return member;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hashedMembers));
      return true;
    } catch (error) {
      console.error("Error saving members:", error);
      return false;
    }
  }

  // Get current session
  function getSession() {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      return session ? JSON.parse(session) : null;
    } catch (error) {
      return null;
    }
  }

  // Set session
  function setSession(user) {
    try {
      const session = {
        user_id: user.id,
        user_email: user.email,
        user_name: user.name,
        user_role: user.role,
        user_permissions: user.permissions || [],
        logged_in: true,
        login_time: new Date().toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return true;
    } catch (error) {
      console.error("Error setting session:", error);
      return false;
    }
  }

  // Clear session (logout)
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  // Check if user is authenticated
  function isAuthenticated() {
    const session = getSession();
    return session && session.logged_in === true;
  }

  // Login function
  function login(email, password) {
    console.log("Login attempt for:", email);
    const members = getMembers();
    console.log("Total members found:", members.length);
    console.log("All members:", members);
    console.log("Searching for email:", email.toLowerCase());
    
    // Debug: show all emails
    members.forEach((m, idx) => {
      console.log(`Member ${idx}: email="${m.email}", email.toLowerCase()="${m.email?.toLowerCase()}", active=${m.active}`);
    });
    
    const member = members.find(
      m => {
        const memberEmail = (m.email || '').toLowerCase().trim();
        const searchEmail = email.toLowerCase().trim();
        const match = memberEmail === searchEmail && m.active !== false;
        console.log(`Comparing: "${memberEmail}" === "${searchEmail}" && active=${m.active} => ${match}`);
        return match;
      }
    );

    if (!member) {
      console.log("Member not found for email:", email);
      console.log("Available emails:", members.map(m => m.email));
      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      };
    }

    console.log("Member found:", member.email, "Password hash:", member.password);
    
    // Check password
    const passwordHash = hashPassword(password);
    console.log("Input password hash:", passwordHash);
    console.log("Stored password hash:", member.password);
    
    const passwordMatch = passwordHash === member.password;
    console.log("Password match:", passwordMatch);
    
    if (!passwordMatch) {
      return {
        success: false,
        error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      };
    }

    // Set session
    const user = {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      permissions: member.permissions || []
    };

    if (setSession(user)) {
      return {
        success: true,
        message: 'تم تسجيل الدخول بنجاح',
        user: user
      };
    } else {
      return {
        success: false,
        error: 'حدث خطأ في حفظ الجلسة'
      };
    }
  }

  // Logout function
  function logout() {
    clearSession();
    return {
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    };
  }

  // Get current user
  function getCurrentUser() {
    const session = getSession();
    if (session && session.logged_in) {
      return {
        id: session.user_id,
        name: session.user_name,
        email: session.user_email,
        role: session.user_role,
        permissions: session.user_permissions || []
      };
    }
    return null;
  }

  // Initialize on load
  // Make sure default admin is created if localStorage is empty
  (async function() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      console.log("Initializing default admin...");
      await initializeDefaultAdmin();
    } else {
      console.log("Members already exist in localStorage");
    }
  })();

  // Export functions
  window.AuthStorage = {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    getMembers,
    saveMembers,
    getSession,
    clearSession
  };
})();

