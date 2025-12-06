// Authentication system (No PHP - uses localStorage)
(function () {
  // Wait for auth-storage to load
  function waitForAuthStorage(callback, maxAttempts = 50) {
    if (window.AuthStorage) {
      callback();
    } else if (maxAttempts > 0) {
      setTimeout(() => waitForAuthStorage(callback, maxAttempts - 1), 100);
    } else {
      console.error("AuthStorage not loaded!");
    }
  }

  // Check if user is authenticated
  function checkAuth() {
    if (!window.AuthStorage) return null;
    const user = window.AuthStorage.getCurrentUser();
    return user;
  }

  // Protect admin pages
  function protectPage() {
    waitForAuthStorage(() => {
      const currentPath = window.location.pathname;
      if (currentPath.includes("admin/") || currentPath.includes("dashboard")) {
        const user = checkAuth();
        if (!user) {
          window.location.href = "../login.html";
          return;
        }
        // Set current user info
        const userEl = document.getElementById("current-user");
        if (userEl) {
          userEl.textContent = `مرحباً، ${user.name}`;
        }
      }
    });
  }

  // Login form handler
  function initLoginForm() {
    const loginForm = document.getElementById("login-form");
    if (!loginForm) return;

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const errorDiv = document.getElementById("login-error");

      // Clear previous errors
      if (errorDiv) {
        errorDiv.style.display = "none";
        errorDiv.textContent = "";
      }

      waitForAuthStorage(() => {
        const result = window.AuthStorage.login(email, password);

        if (result.success) {
          // Redirect to dashboard
          window.location.href = "admin/dashboard.html";
        } else {
          // Show error
          if (errorDiv) {
            errorDiv.textContent = result.error || "حدث خطأ أثناء تسجيل الدخول";
            errorDiv.style.display = "block";
          }
        }
      });
    });
  }

  // Logout handler
  function initLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", () => {
      waitForAuthStorage(() => {
        window.AuthStorage.logout();
        window.location.href = "../login.html";
      });
    });
  }

  // Initialize on page load
  document.addEventListener("DOMContentLoaded", function () {
    initLoginForm();
    initLogout();
    protectPage();
  });

  // Expose checkAuth for use in other scripts
  window.checkAuth = checkAuth;
})();
