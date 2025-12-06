// Display projects on ourProjects.html page
(function () {
  // Wait for storage
  function waitForStorage(callback) {
    if (window.ProjectsStorage) {
      callback();
    } else {
      setTimeout(() => waitForStorage(callback), 100);
    }
  }

  // Display projects
  function displayProjects() {
    waitForStorage(() => {
      const container = document.getElementById("projects-container");
      if (!container) return;

      const projects = window.ProjectsStorage.getProjects();

      if (projects.length === 0) {
        container.innerHTML = `
          <div class="no-projects muted" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
            <p>لا توجد مشاريع حالياً. تحقق لاحقاً!</p>
          </div>
        `;
        return;
      }

      // Sort by date (newest first)
      const sortedProjects = [...projects].sort((a, b) => {
        const dateA = new Date(a.date || a.created_at || 0);
        const dateB = new Date(b.date || b.created_at || 0);
        return dateB - dateA;
      });

      container.innerHTML = sortedProjects
        .map((project) => {
          const currentLang = document.documentElement.lang || 'en';
          const title = currentLang === 'ar' ? (project.title_ar || project.title_en) : (project.title_en || project.title_ar);
          const desc = currentLang === 'ar' ? (project.desc_ar || project.desc_en) : (project.desc_en || project.desc_ar);
          const date = project.date || project.created_at || '';
          const img = project.img || '';
          const href = project.href || 'ourProjects.html';
          const category = project.category || 'general';
          const featured = project.featured ? '<span class="featured-badge">⭐ مميز</span>' : '';

          const imageHtml = img 
            ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" loading="lazy" />`
            : '<div style="height: 160px; background: rgba(47, 164, 255, 0.1); display: flex; align-items: center; justify-content: center; color: var(--muted);">📁</div>';

          return `
            <article class="project-card">
              ${imageHtml}
              <div class="project-body">
                <h3>${escapeHtml(title)}${featured}</h3>
                <p style="color: var(--muted); font-size: 0.9rem; line-height: 1.5;">${escapeHtml(desc)}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 12px;">
                  <span style="font-size: 0.85rem; color: var(--muted);">${date}</span>
                  <span style="font-size: 0.85rem; color: var(--accent);">${escapeHtml(category)}</span>
                </div>
                ${href ? `<div class="project-actions"><a href="${escapeHtml(href)}" class="btn small">عرض المشروع</a></div>` : ''}
              </div>
            </article>
          `;
        })
        .join("");

      // Trigger reveal animation
      setTimeout(() => {
        container.querySelectorAll('.project-card').forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('reveal-up', 'show');
          }, index * 100);
        });
      }, 100);
    });
  }

  // Utility function
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize on page load
  document.addEventListener("DOMContentLoaded", function () {
    displayProjects();
  });
})();

