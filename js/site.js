// Shared site JS: i18n, mobile nav toggle, reveal animations, contact form, discord invite, year
(function () {
  // --- i18n translations (EN / AR) ---
  const translations = {
    en: {
      "nav.home": "Home",
      "nav.about": "About us",
      "nav.team": "Our Team",
      "nav.projects": "Our Projects",
      "nav.contact": "Contact us",
      "hero.titleMain":
        "We help students understand tech easily & practically.",
      "hero.sub":
        "Hands-on courses, real projects & continuous support — learn by doing.",
      "hero.cta": "Start Learning",
      "hero.secondary": "Explore Projects",
      "hero.preview.courses": "Courses",
      "hero.preview.projects": "Projects",
      "hero.preview.support": "Support",
      "features.heading": "Expert Team & Education",
      "features.sub":
        "Simplified service and training for complex technologies — courses, support and guidance.",
      "f1.title": "Expert IT Team & Mentors",
      "f1.p":
        "An experienced technical team providing practical guidance and personal follow-up for your projects.",
      "f1.muted": "Mentorship, code reviews, career guidance.",
      "f1.btn": "Meet the team",
      "f2.title": "Simplifying complex tech concepts",
      "f2.p":
        "Simplifying difficult topics with a clear and practical educational approach with real examples.",
      "f2.muted": "Workshops, bite-sized lessons, hands-on labs.",
      "f2.btn": "See how",
      "f3.title": "Courses | Support | Guidance",
      "f3.p":
        "Structured courses, technical support, and continuous guidance to help you progress.",
      "f3.muted": "Courses, 1:1 support, project guidance.",
      "f3.btn": "Get support",
      "about.title": "About Us",
      "about.desc":
        "We are university students studying IT — passionate about teaching, mentoring, and building real-world projects together.",
      "about.vision.title": "Vision",
      "about.vision.p":
        "Make quality practical tech education accessible for every student.",
      "about.mission.title": "Mission",
      "about.mission.p":
        "Build hands-on learning paths and supportive community environments.",
      "about.goals.title": "Goals",
      "about.goals.1": "Practical project-based learning",
      "about.goals.2": "Career-ready mentorship",
      "about.goals.3": "Inclusive community support",
      "about.values":
        "Team values: Collaboration — Innovation — Support — Learning",
      "about.teamHeading": "Our group",
      "team.title": "Our Team",
      "team.subtitle": "Passionate students ready to teach and mentor.",
      "team.m1.name": "Ibrahim Khwira",
      "team.m1.meta": "Computer Science Student",
      "team.m2.name": "Yazan Al-Mustafa",
      "team.m2.meta": "Artificial Intelligence Student",
      "team.m3.name": "Aman Abu-Hadeed",
      "team.m3.meta": "Computer Science Student",
      "team.m4.name": "Ayman Al-Shwarbeh",
      "team.m4.meta": "Software Engineering Student",
      "team.m5.name": "Abdaljaleel Al-Naqeez",
      "team.m5.meta": "Computer Science Student",
      "team.m6.name": "Ahmad Ghazawi",
      "team.m6.meta": "E-Marketing",
      "team.m7.name": "Mahmoud Al-Mustafa",
      "team.m7.meta": "E-Marketing",
      "projects.title": "Our Projects",
      "projects.subtitle": "Student-built projects, demos and case studies.",
      "p1.title": "Campus e-Learning Portal",
      "p1.desc":
        "A lightweight LMS for hosting short practical courses and tracking student progress.",
      "p2.title": "Smart Study Planner",
      "p2.desc":
        "An intelligent scheduling assistant using heuristics and ML to optimize study sessions.",
      "p3.title": "Future project slot",
      "latest.heading": "Latest updates",
      "latest.sub": "Recent projects and activity on the site.",
      "latest.empty": "No updates yet — check back soon.",
      "latest.viewAll": "View all projects",
      "p3.desc": "We’ll add more projects here — check back soon.",
      "teamfeed.heading": "Latest — Team",
      "teamfeed.sub": "Recent team news and changes.",
      "teamfeed.empty": "No team updates yet.",
      "teamfeed.new": "New",
      "teamfeed.viewAll": "View all team",
      "contact.title": "Contact Us",
      "contact.subtitle":
        "Have a question, need help, or want mentorship? Send us a message.",
      "contact.form.name": "Name",
      "contact.form.email": "Email",
      "contact.form.msg": "Message",
      "contact.form.send": "Send Message",
      "contact.social": "Connect & Social",
      "contact.social-desc": "Available channels to reach us.",
      "discord.title": "Join our Discord",
      "discord.subtitle":
        "Join our tech community for help, courses and competitions.",
      "discord.desc": "Active channels, live help, weekly events.",
      "contact.feedback.empty": "Please complete all fields.",
      "contact.feedback.sent": "Thanks — your message has been queued (demo).",
      // footer
      "footer.brand-desc":
        "We teach, build, and inspire the future of Arab developers.",
      "footer.platform": "Platform",
      "footer.platform.tutorials": "Tutorials",
      "footer.platform.challenges": "Challenges",
      "footer.platform.store": "Store",
      "footer.platform.services": "Services",
      "footer.resources": "Resources",
      "footer.resources.studenthub": "Student Hub",
      "footer.resources.about": "About",
      "footer.resources.blog": "Blog",
      "footer.resources.faq": "FAQ",
      "footer.connect": "Connect",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
    },
    ar: {
      "nav.home": "الرئيسية",
      "nav.about": "من نحن",
      "nav.team": "فريقنا",
      "nav.projects": "مشاريعنا",
      "nav.contact": "اتصل بنا",
      "hero.titleMain": "نساعد الطلاب على فهم التقنية بسهولة وعملياً.",
      "hero.sub":
        "كورسات تطبيقية، مشاريع حقيقية، ودعم مستمر — تعلّم بالممارسة.",
      "hero.cta": "ابدأ التعلم",
      "hero.secondary": "عرض المشاريع",
      "hero.preview.courses": "الدورات",
      "hero.preview.projects": "المشاريع",
      "hero.preview.support": "الدعم",
      "features.heading": "فريق الخبراء والتعليم",
      "features.sub": "خدمة وتدريب مبسّط لتقنيات معقّدة — دورات، دعم وإرشاد.",
      "f1.title": "فريق تقني متمرس ومرشدون",
      "f1.p": "فريق تقني متمرس يقدم إرشادًا عمليًا ومتابعة شخصية لمشاريعك.",
      "f1.muted": "إرشاد، مراجعة الكود، توجيه مهني.",
      "f1.btn": "تعرف على الفريق",
      "f2.title": "تبسيط المفاهيم التقنية المعقدة",
      "f2.p":
        "نحو تبسيط المواضيع الصعبة بأسلوب تعليمي واضح وعملي مع أمثلة حقيقية.",
      "f2.muted": "ورش عمل، دروس قصيرة، مختبرات عملية.",
      "f2.btn": "اكتشف كيف",
      "f3.title": "دورات | دعم | إرشاد",
      "f3.p": "دورات مهيكلة، دعم فني، وإرشاد متواصل لمساعدتك في التقدّم.",
      "f3.muted": "دورات، دعم فردي، إرشاد المشاريع.",
      "f3.btn": "احصل على الدعم",
      "about.title": "من نحن",
      "about.desc":
        "نحن طلاب جامعيون في مجال تقنية المعلومات — متحمّسون للتعليم والإرشاد وبناء مشاريع حقيقية معًا.",
      "about.vision.title": "الرؤية",
      "about.vision.p": "إتاحة التعليم العملي عالي الجودة في التقنية لكل طالب.",
      "about.mission.title": "المهمة",
      "about.mission.p": "بناء مسارات تعليمية تطبيقية وبيئات مجتمعية داعمة.",
      "about.goals.title": "الأهداف",
      "about.goals.1": "التعلم بالمشاريع العملية",
      "about.goals.2": "توجيه مهني جاهز للعمل",
      "about.goals.3": "مجتمع داعم وشامل",
      "about.values": "قيم الفريق: التعاون — الابتكار — الدعم — التعلم",
      "about.teamHeading": "مجموعتنا",
      "team.title": "فريقنا",
      "team.subtitle": "طلاب متحمسون للتدريس والإرشاد.",
      "team.m1.name": "إبراهيم خويرة",
      "team.m1.meta": "طالب علوم الحاسوب",
      "team.m2.name": "يزن المصطفى",
      "team.m2.meta": "طالب ذكاء اصطناعي",
      "team.m3.name": "امان أبو حديد",
      "team.m3.meta": "طالب علوم الحاسوب",
      "team.m4.name": "ايمان الشواربة",
      "team.m4.meta": "طالبة هندسة برمجيات",
      "team.m5.name": "عبدالجليل النقيز",
      "team.m5.meta": "طالب علوم الحاسوب",
      "team.m6.name": "احمد غزاوي",
      "team.m6.meta": "طالب تسويق رقمي",
      "team.m7.name": "محمود المصطفى",
      "team.m7.meta": "طالب تسويق رقمي",
      "projects.title": "مشاريعنا",
      "projects.subtitle": "مشاريع طلابية، عروض عملية ودراسات حالة.",
      "p1.title": "منصة تعليم إلكتروني للجامعة",
      "p1.desc": "نظام خفيف لاستضافة دورات قصيرة عملية وتتبع تقدّم الطلاب.",
      "p2.title": "منظّم الدراسة الذكي",
      "p2.desc": "مساعد جدولة ذكي يعتمد ML لتنظيم جلسات الدراسة وتحسينها.",
      "p3.title": "مساحة للمشاريع القادمة",
      "latest.heading": "آخر التحديثات",
      "latest.sub": "أحدث المشاريع والنشاطات على الموقع.",
      "latest.empty": "لا توجد تحديثات بعد — تفقدنا لاحقًا.",
      "latest.viewAll": "عرض جميع المشاريع",
      "p3.desc": "سوف نضيف مشاريع جديدة هنا — تفقد الموقع لاحقًا.",
      "teamfeed.heading": "آخر أخبار الفريق",
      "teamfeed.sub": "أحدث الأخبار والتغييرات في الفريق.",
      "teamfeed.empty": "لا توجد تحديثات للفريق حالياً.",
      "teamfeed.new": "جديد",
      "teamfeed.viewAll": "عرض الفريق",
      "contact.title": "اتصل بنا",
      "contact.subtitle":
        "هل لديك سؤال؟ تريد إرشادًا أم دعمًا؟ أرسِل رسالة لنا.",
      "contact.form.name": "الاسم",
      "contact.form.email": "البريد الإلكتروني",
      "contact.form.msg": "الرسالة",
      "contact.form.send": "إرسال الرسالة",
      "contact.social": "تواصل معنا",
      "contact.social-desc": "قنوات الوصول إلينا.",
      "contact.feedback.empty": "الرجاء تعبئة جميع الحقول.",
      "contact.feedback.sent": "شكرًا — تم إرسال رسالتك (وهمي).",
      // footer
      "footer.brand-desc": "نعلّم ونبني ونلهم مستقبل مطوّري المنطقة العربية.",
      "footer.platform": "المنصة",
      "footer.platform.tutorials": "الدروس",
      "footer.platform.challenges": "التحديات",
      "footer.platform.store": "المتجر",
      "footer.platform.services": "الخدمات",
      "footer.resources": "الموارد",
      "footer.resources.studenthub": "مركز الطلاب",
      "footer.resources.about": "من نحن",
      "footer.resources.blog": "المدونة",
      "footer.resources.faq": "الأسئلة الشائعة",
      "footer.connect": "تواصل",
      "footer.privacy": "الخصوصية",
      "footer.terms": "الشروط",
      "discord.title": "انضم إلى خادمنا على ديسكورد",
      "discord.subtitle": "انضم لمجتمع التقنيين للدعم، الدورات والمسابقات.",
      "discord.desc": "قنوات نشطة، دعم مباشر، وفعاليات أسبوعية.",
    },
  };

  // language buttons
  const allLangBtns = Array.from(document.querySelectorAll(".lang-btn"));

  function applyLang(lang) {
    const map = translations[lang] || translations.en;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (map[k]) el.textContent = map[k];
    });

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", lang === "ar");

    allLangBtns.forEach((b) => {
      const is = b.getAttribute("data-lang") === lang;
      b.setAttribute("aria-pressed", String(is));
      b.classList.toggle("active", is);
    });
    localStorage.setItem("site-lang", lang);
  }

  allLangBtns.forEach((b) =>
    b.addEventListener("click", () => applyLang(b.getAttribute("data-lang")))
  );

  // mobile menu + active behavior (works across pages)
  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.getElementById("primary-navigation");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.classList.toggle("show");
      });

      // close on link click for small screens
      nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A" && window.innerWidth <= 720) {
          nav.classList.remove("show");
          toggle.setAttribute("aria-expanded", "false");
        }
      });

      // active class management
      const links = Array.from(nav.querySelectorAll("a"));
      links.forEach((a) =>
        a.addEventListener("click", (e) => {
          links.forEach((l) => l.classList.remove("active"));
          e.currentTarget.classList.add("active");
        })
      );

      // initial active based on current page
      function setActiveFromPage() {
        const currentPage =
          window.location.pathname.split("/").pop() || "index.html";
        links.forEach((l) => {
          const href = l.getAttribute("href");
          if (
            href === currentPage ||
            (currentPage === "" && href === "index.html")
          ) {
            l.classList.add("active");
          } else {
            l.classList.remove("active");
          }
        });
      }
      setActiveFromPage();
    }

    // set year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // reveal observer
    const reveals = document.querySelectorAll(".reveal-up");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (ent) => ent.isIntersecting && ent.target.classList.add("show")
          );
        },
        { threshold: 0.12 }
      );
      reveals.forEach((r) => io.observe(r));
    } else reveals.forEach((r) => r.classList.add("show"));

    // Latest feed: team updates (anything new about the team)
    (function loadTeamUpdates() {
      const feedEl = document.getElementById("team-feed");
      if (!feedEl) return;

      function formatDateT(dateStr, lang) {
        try {
          const d = new Date(dateStr);
          return d.toLocaleDateString(
            lang || document.documentElement.lang || "en",
            {
              month: "short",
              day: "numeric",
            }
          );
        } catch (e) {
          return dateStr;
        }
      }

      function renderTeam(items) {
        if (!items || items.length === 0) {
          feedEl.innerHTML = `<div class="feed-empty muted" data-i18n="teamfeed.empty">No team updates yet.</div>`;
          return;
        }

        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        const max = 4;
        const slice = items.slice(0, max);
        const lang = document.documentElement.lang || "en";

        const NEW_WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
        const html = `<div class="team-updates-list">${slice
          .map((it) => {
            const isNew =
              Date.now() - new Date(it.date).getTime() <= NEW_WINDOW_MS;
            return `
            <article class="team-update" data-new="${isNew}" tabindex="0">
              <a class="team-update-link" href="${it.href || "#"}">
                ${
                  it.img
                    ? `<img src="${it.img}" alt="${
                        it["title_" + lang] || it.title_en
                      }" class="team-update-thumb"/>`
                    : ""
                }
                <div class="team-update-body">
                  <div class="team-update-meta"><time datetime="${
                    it.date
                  }">${formatDateT(it.date, lang)}</time></div>
                  <div class="team-update-title">${
                    it["title_" + lang] || it.title_en
                  } ${
              isNew
                ? `<span class="badge new" data-i18n="teamfeed.new">New</span>`
                : ""
            }</div>
                  <div class="team-update-desc muted">${
                    it["desc_" + lang] || it.desc_en
                  }</div>
                </div>
              </a>
            </article>
          `;
          })
          .join("")}</div>`;

        feedEl.innerHTML = html;
      }

      fetch("data/team-updates.json")
        .then((r) => {
          if (!r.ok) throw new Error("no data");
          return r.json();
        })
        .then((data) => renderTeam(data))
        .catch(() => {
          const fallback = [
            {
              id: "t1",
              title_en: translations.en["team.m1.name"] + " — New activity",
              title_ar: translations.ar["team.m1.name"] + " — نشاط جديد",
              desc_en:
                translations.en["team.m1.name"] + " announced a new workshop.",
              desc_ar: translations.ar["team.m1.name"] + " أعلن عن ورشة جديدة.",
              date: new Date().toISOString().slice(0, 10),
              href: "ourTeam.html",
            },
          ];
          renderTeam(fallback);
        });
    })();

    // Latest feed: load updates from data/updates.json and render
    (function loadLatestUpdates() {
      const feedEl = document.getElementById("latest-feed");
      if (!feedEl) return;

      function formatDate(dateStr, lang) {
        try {
          const d = new Date(dateStr);
          return d.toLocaleDateString(
            lang || document.documentElement.lang || "en",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          );
        } catch (e) {
          return dateStr;
        }
      }

      function render(items) {
        if (!items || items.length === 0) {
          feedEl.innerHTML = `<div class="feed-empty muted" data-i18n="latest.empty">No updates yet — check back soon.</div>`;
          return;
        }

        // sort newest first by date, slice to show max 5
        items.sort((a, b) => new Date(b.date) - new Date(a.date));
        const max = 5;
        const slice = items.slice(0, max);

        const lang = document.documentElement.lang || "en";

        const html = `
          <div class="feed-grid">
            ${slice
              .map(
                (it) => `
                <article class="feed-item" tabindex="0">
                  <a href="${it.href || "#"}" class="feed-link" aria-label="${
                  it["title_" + lang] || it.title_en
                }">
                    ${
                      it.img
                        ? `<img src="${it.img}" class="feed-thumb" alt="${
                            it["title_" + lang] || it.title_en
                          }" />`
                        : ""
                    }
                    <div class="feed-body">
                      <div class="feed-meta"><time datetime="${
                        it.date
                      }">${formatDate(it.date, lang)}</time></div>
                      <h4 class="feed-title">${
                        it["title_" + lang] || it.title_en
                      }</h4>
                      <p class="feed-desc muted">${
                        it["desc_" + lang] || it.desc_en
                      }</p>
                    </div>
                  </a>
                </article>
              `
              )
              .join("")}
          </div>`;

        feedEl.innerHTML = html;
      }

      // Try to fetch JSON; fallback to built-in sample if that fails
      fetch("data/updates.json")
        .then((r) => {
          if (!r.ok) throw new Error("no data");
          return r.json();
        })
        .then((data) => render(data))
        .catch(() => {
          // fallback: search for a small set of project previews embedded in translations
          const fallback = [
            {
              id: "p1",
              title_en: translations.en["p1.title"],
              title_ar: translations.ar["p1.title"],
              desc_en: translations.en["p1.desc"],
              desc_ar: translations.ar["p1.desc"],
              date: new Date().toISOString().slice(0, 10),
              href: "ourProjects.html",
            },
          ];
          render(fallback);
        });
    })();

    // contact form
    const form = document.getElementById("contact-form");
    const feedback = document.getElementById("contact-feedback");
    if (form) {
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const data = new FormData(form);
        const name = (data.get("name") || "").toString().trim();
        const email = (data.get("email") || "").toString().trim();
        const message = (data.get("message") || "").toString().trim();
        if (!name || !email || !message) {
          const cur = document.documentElement.lang || "en";
          const msgEmpty =
            (translations[cur] &&
              translations[cur]["contact.feedback.empty"]) ||
            translations.en["contact.feedback.empty"];
          if (feedback) feedback.textContent = msgEmpty;
          return;
        }
        // stub: display success and clear
        const cur2 = document.documentElement.lang || "en";
        const sentMsg =
          (translations[cur2] && translations[cur2]["contact.feedback.sent"]) ||
          translations.en["contact.feedback.sent"];
        if (feedback) feedback.textContent = sentMsg;
        form.reset();
        setTimeout(() => feedback && (feedback.textContent = ""), 3500);
      });
    }

    // discord button pulse
    const discordBtn = document.getElementById("discord-invite");
    if (discordBtn) {
      discordBtn.addEventListener("click", (e) => {
        e.preventDefault();
        discordBtn.classList.add("pulsing");
        setTimeout(() => discordBtn.classList.remove("pulsing"), 800);
      });
    }

    // pick initial language
    const stored = localStorage.getItem("site-lang");
    const initial =
      stored ||
      (navigator.language && navigator.language.startsWith("ar") ? "ar" : "en");
    applyLang(initial);

    // Particles Cursor Animation - Disabled
    if (
      false &&
      window.innerWidth > 1024 &&
      window.matchMedia("(hover: hover)").matches
    ) {
      // Create canvas for particles
      const canvas = document.createElement("canvas");
      canvas.id = "particles-canvas";
      document.body.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      // Set canvas size
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      // Create cursor dot
      const cursor = document.createElement("div");
      cursor.className = "particles-cursor";
      document.body.appendChild(cursor);

      // Particles array
      const particles = [];
      const particleCount = 50;
      const colors = [0x1d9ae8, 0x1d9ae8]; // Blue colors
      const mainColor = 0x000eff; // Main blue

      // Mouse position
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let cursorX = mouseX;
      let cursorY = mouseY;

      // Particle class
      class Particle {
        constructor() {
          this.reset();
          this.y = Math.random() * canvas.height;
          this.x = Math.random() * canvas.width;
        }

        reset() {
          this.x = mouseX;
          this.y = mouseY;
          this.size = Math.random() * 3 + 1;
          this.speedX = (Math.random() - 0.5) * 2;
          this.speedY = (Math.random() - 0.5) * 2;
          this.life = 1;
          this.decay = Math.random() * 0.02 + 0.01;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.life -= this.decay;

          // Attract to cursor
          const dx = cursorX - this.x;
          const dy = cursorY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            this.speedX += dx * 0.0005;
            this.speedY += dy * 0.0005;
          }

          // Reset if dead or out of bounds
          if (
            this.life <= 0 ||
            this.x < 0 ||
            this.x > canvas.width ||
            this.y < 0 ||
            this.y > canvas.height
          ) {
            this.reset();
          }
        }

        draw() {
          ctx.save();
          ctx.globalAlpha = this.life;
          ctx.fillStyle = `#${this.color.toString(16).padStart(6, "0")}`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `#${this.color.toString(16).padStart(6, "0")}`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      // Mouse move
      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      // Smooth cursor movement
      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";
        requestAnimationFrame(animateCursor);
      }

      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });

        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = (1 - distance / 100) * 0.3;
              ctx.strokeStyle = `#${mainColor.toString(16).padStart(6, "0")}`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }

        // Draw connections to cursor
        particles.forEach((particle) => {
          const dx = cursorX - particle.x;
          const dy = cursorY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 150) * 0.4 * particle.life;
            ctx.strokeStyle = `#${mainColor.toString(16).padStart(6, "0")}`;
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 5;
            ctx.shadowColor = `#${mainColor.toString(16).padStart(6, "0")}`;
            ctx.beginPath();
            ctx.moveTo(cursorX, cursorY);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            ctx.restore();
          }
        });

        requestAnimationFrame(animate);
      }

      // Start animations
      animateCursor();
      animate();

      // Hide cursor when leaving window
      document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
      });
      document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
      });
    }

    // Old cursor code - disabled
    if (
      false &&
      window.innerWidth > 1024 &&
      window.matchMedia("(hover: hover)").matches
    ) {
      const cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      cursor.innerHTML = `
        <div class="cursor-bg-orb"></div>
        <div class="cursor-tech-lines"></div>
        <div class="cursor-corners"></div>
        <div class="cursor-ring"></div>
        <div class="cursor-dot"></div>
      `;
      document.body.appendChild(cursor);

      // Create interactive background effect
      const bgEffect = document.createElement("div");
      bgEffect.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(47, 164, 255, 0.1) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1;
        filter: blur(40px);
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(bgEffect);

      let mouseX = 0;
      let mouseY = 0;
      let cursorX = 0;
      let cursorY = 0;
      let trailDelay = 0;

      // Smooth cursor movement with background parallax
      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        // Background effect follows cursor with delay (parallax)
        const bgX = mouseX - 200;
        const bgY = mouseY - 200;
        bgEffect.style.left = bgX + "px";
        bgEffect.style.top = bgY + "px";

        requestAnimationFrame(animateCursor);
      }

      // Mouse move
      document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create trail effect
        if (trailDelay === 0) {
          const trail = document.createElement("div");
          trail.className = "cursor-trail";
          trail.style.left = e.clientX + "px";
          trail.style.top = e.clientY + "px";
          document.body.appendChild(trail);
          setTimeout(() => trail.remove(), 500);
          trailDelay = 3;
        } else {
          trailDelay--;
        }
      });

      // Hover effects
      const hoverElements = document.querySelectorAll(
        "a, button, .btn, .team-card, .feature-card, .project-card"
      );
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor-hover");
          bgEffect.style.opacity = "1";
          bgEffect.style.width = "500px";
          bgEffect.style.height = "500px";
        });
        el.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-hover");
          bgEffect.style.opacity = "0.5";
          bgEffect.style.width = "400px";
          bgEffect.style.height = "400px";
        });
      });

      // Show background effect on mouse move
      document.addEventListener("mousemove", () => {
        if (bgEffect.style.opacity === "0" || bgEffect.style.opacity === "") {
          bgEffect.style.opacity = "0.3";
        }
      });

      // Click effect
      document.addEventListener("mousedown", () => {
        cursor.classList.add("cursor-click");
      });
      document.addEventListener("mouseup", () => {
        cursor.classList.remove("cursor-click");
      });

      // Hide cursor when leaving window
      document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        bgEffect.style.opacity = "0";
      });
      document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        bgEffect.style.opacity = "0.3";
      });

      // Start animation
      animateCursor();
    }
  });

  // Mobile Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navList = document.querySelector('.nav-list');
  const dropdownToggles = document.querySelectorAll('.has-dropdown .dropdown-toggle');
  
  // Toggle mobile menu
  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', function() {
      navList.classList.toggle('show');
      this.setAttribute('aria-expanded', 
        this.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Handle dropdown toggles on mobile
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) { // Only for mobile
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('active');
        
        // Close other open dropdowns
        dropdownToggles.forEach(otherToggle => {
          if (otherToggle !== this) {
            otherToggle.parentElement.classList.remove('active');
          }
        });
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-list') && !e.target.closest('.mobile-toggle')) {
      if (navList) navList.classList.remove('show');
      document.querySelectorAll('.has-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  });

  // Handle window resize
  function handleResize() {
    if (window.innerWidth > 768 && navList) {
      navList.classList.remove('show');
      document.querySelectorAll('.has-dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
  }

  window.addEventListener('resize', handleResize);
})();
