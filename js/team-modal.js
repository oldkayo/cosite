// Team Member Modal System
(function () {
  const modal = document.getElementById("team-member-modal");
  const modalClose = document.querySelector(".modal-close");
  const teamCards = document.querySelectorAll(".team-card");

  if (!modal || !teamCards.length) return;

  /**
   * Open modal with team member data
   * @param {HTMLElement} card - The clicked team card element
   */
  function openModal(card) {
    // Extract data from card
    const name = card.querySelector("h4")?.textContent || "";
    const meta = card.querySelector(".team-meta")?.textContent || "";
    const description = card.querySelector(".tags")?.textContent || "";
    const image = card.querySelector(".team-card-image img")?.src || "";
    const linkedinLink = card.querySelector(".btn")?.href || "#";
    const whatsappNumber = card.dataset.whatsapp || "";

    // Populate modal
    document.getElementById("modal-title").textContent = name;
    document.querySelector(".modal-member-meta").textContent = meta;
    document.querySelector(".modal-member-description").textContent =
      description;
    document.getElementById("modal-member-image").src = image;
    document.getElementById("modal-member-image").alt = name;

    // LinkedIn button
    const linkedinBtn = document.getElementById("modal-linkedin-btn");
    linkedinBtn.href = linkedinLink;

    // WhatsApp button - show/hide based on data-whatsapp attribute
    const whatsappBtn = document.getElementById("modal-whatsapp-btn");
    if (whatsappNumber) {
      whatsappBtn.href = `https://wa.me/${whatsappNumber}`;
      whatsappBtn.style.display = "flex";
    } else {
      whatsappBtn.style.display = "none";
    }

    // Show modal with animation
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus management for accessibility
    modalClose.focus();
  }

  /**
   * Close modal
   */
  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Event listeners for team cards
  teamCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));

    // Keyboard support - Enter or Space to open modal
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  // Close button
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  // Close on outside click (on the overlay)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
})();
