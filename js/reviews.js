// Reviews system - handle loading, display, and submission of reviews
(function () {
  let allReviews = [];
  let selectedRating = 0;

  // Load reviews from JSON file
  async function loadReviews() {
    try {
      const response = await fetch("data/reviews.json");
      const jsonReviews = await response.json();
      allReviews = Array.isArray(jsonReviews) ? jsonReviews : [];

      displayReviews(allReviews);
      displayLatestReviewsOnHome();
      updateStats();
    } catch (error) {
      console.error("Error loading reviews:", error);
      allReviews = [];
      displayReviews(allReviews);
    }
  }

  // Display reviews with optional filtering
  function displayReviews(reviews) {
    const container = document.getElementById("reviews-container");
    if (!container) return;

    if (reviews.length === 0) {
      container.innerHTML =
        '<div class="no-reviews muted">No reviews yet. Be the first to share your feedback!</div>';
      return;
    }

    container.innerHTML = reviews
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((review) => createReviewElement(review))
      .join("");
  }

  // Display latest reviews on homepage
  function displayLatestReviewsOnHome() {
    const homeContainer = document.getElementById("home-reviews-feed");
    if (!homeContainer) return;

    const latest = [...allReviews]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    if (latest.length === 0) {
      homeContainer.innerHTML =
        '<div class="no-reviews muted">No reviews yet. Be the first to share your feedback!</div>';
      return;
    }

    homeContainer.innerHTML = `
      <div class="reviews-grid-home">
        ${latest.map((review) => createReviewElement(review)).join("")}
      </div>
    `;
  }

  // Create individual review HTML
  function createReviewElement(review) {
    const date = new Date(review.date);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const stars = "⭐".repeat(review.rating) + "☆".repeat(5 - review.rating);
    const verified = review.verified
      ? '<span class="verified-badge" title="Verified Review">✓ Verified</span>'
      : "";

    return `
      <div class="review-card" data-rating="${review.rating}">
        <div class="review-header">
          <div class="review-meta">
            <h3 class="review-author">${escapeHtml(review.author)}</h3>
            <p class="review-date">${formattedDate}</p>
          </div>
          <div class="review-rating">${stars}</div>
          ${verified}
        </div>
        <p class="review-text">${escapeHtml(review.text)}</p>
      </div>
    `;
  }

  // Update statistics
  function updateStats() {
    if (allReviews.length === 0) return;

    const totalReviews = allReviews.length;
    const avgRating = (
      allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    ).toFixed(1);
    const verifiedCount = allReviews.filter((r) => r.verified).length;

    const totalEl = document.getElementById("total-reviews");
    const avgEl = document.getElementById("avg-rating");
    const verifiedEl = document.getElementById("verified-count");

    if (totalEl) totalEl.textContent = totalReviews;
    if (avgEl) avgEl.textContent = avgRating;
    if (verifiedEl) verifiedEl.textContent = verifiedCount;
  }

  // Get latest reviews (for homepage)
  function getLatestReviews(count = 3) {
    return [...allReviews]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, count);
  }

  // Handle review form submission
  function handleReviewSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("reviewer-name").value.trim();
    const email = document.getElementById("reviewer-email").value.trim();
    const text = document.getElementById("reviewer-text").value.trim();

    if (!name || !selectedRating || !text) {
      alert("يرجى ملء جميع الحقول المطلوبة واختيار تقييم.");
      return;
    }

    const newReview = {
      author: name,
      email: email,
      rating: selectedRating,
      text: text,
    };

    // Show loading state
    showNotification("جاري إرسال التقييم...");

    // Send to server to save in reviews.json
    fetch("api/save-review.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || `HTTP Error: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // Close modal and reset form
          closeModal();
          document.getElementById("review-form").reset();
          selectedRating = 0;
          updateRatingDisplay();

          // Reload reviews from server
          loadReviews();

          // Show success message
          showNotification("شكراً! تم إضافة تقييمك بنجاح.");
        } else {
          showNotification("حدث خطأ: " + (data.error || "فشل حفظ التقييم"));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showNotification("خطأ: " + error.message);
      });
  }

  // Rating selection in form
  function handleRatingClick(rating) {
    selectedRating = rating;
    updateRatingDisplay();

    // Update visual feedback
    document.querySelectorAll(".star-btn").forEach((btn) => {
      const btnRating = parseInt(btn.dataset.rating);
      if (btnRating <= rating) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  }

  function updateRatingDisplay() {
    const display = document.getElementById("rating-display");
    if (display) {
      if (selectedRating > 0) {
        display.textContent = `${selectedRating} star${
          selectedRating !== 1 ? "s" : ""
        }`;
      } else {
        display.textContent = "Select a rating";
      }
    }
  }

  // Modal handling
  function openModal() {
    const modal = document.getElementById("review-modal");
    if (modal) {
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    const modal = document.getElementById("review-modal");
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  // Filter reviews by rating
  function filterByRating(minRating) {
    if (minRating === "all") {
      displayReviews(allReviews);
    } else {
      const filtered = allReviews.filter(
        (r) => r.rating >= parseInt(minRating)
      );
      displayReviews(filtered);
    }
  }

  // Notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
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

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", function () {
    loadReviews();

    // Modal controls - reviews page
    const addBtn = document.getElementById("add-review-btn");
    const closeBtn = document.querySelector(".modal-close");
    const modal = document.getElementById("review-modal");

    if (addBtn) addBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeModal();
      });
    }

    // Modal controls - homepage
    const homeReviewBtn = document.getElementById("home-review-btn");
    if (homeReviewBtn) {
      homeReviewBtn.addEventListener("click", openModal);
    }

    // Form submission
    const form = document.getElementById("review-form");
    if (form) form.addEventListener("submit", handleReviewSubmit);

    // Star rating buttons
    document.querySelectorAll(".star-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        handleRatingClick(parseInt(this.dataset.rating));
      });
    });

    // Filter buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        filterByRating(this.dataset.filter);
      });
    });

    // Expose function for external use
    window.getLatestReviews = getLatestReviews;
  });
})();
