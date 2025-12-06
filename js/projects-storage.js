// Projects storage system (No PHP - uses localStorage)
(function () {
  const STORAGE_KEY = "comixdev_projects";

  // Get all projects from storage
  function getProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const projects = JSON.parse(stored);
        console.log("Loaded projects from localStorage:", projects.length);
        return projects;
      }

      // If there's no localStorage data, asynchronously try to load from file
      // but return an empty array synchronously so callers don't receive a Promise.
      loadProjectsFromFile()
        .then((projects) => {
          if (Array.isArray(projects) && projects.length > 0) {
            saveProjects(projects);
          }
        })
        .catch((err) => {
          console.error("Failed to load projects from file:", err);
        });

      return [];
    } catch (error) {
      console.error("Error loading projects:", error);
      return [];
    }
  }

  // Load projects from JSON file (fallback)
  async function loadProjectsFromFile() {
    try {
      const response = await fetch("../data/updates.json");
      if (response.ok) {
        const projects = await response.json();
        // Save to localStorage for future use
        if (projects.length > 0) {
          saveProjects(projects);
        }
        return projects;
      }
    } catch (error) {
      console.error("Error loading from file:", error);
    }
    return [];
  }

  // Save projects to storage
  function saveProjects(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      return true;
    } catch (error) {
      console.error("Error saving projects:", error);
      return false;
    }
  }

  // Add new project
  function addProject(projectData) {
    const projects = getProjects();

    // Get next ID
    let nextId = 1;
    if (projects.length > 0) {
      const ids = projects
        .map((p) => {
          // Handle both numeric and string IDs
          const id = p.id;
          if (typeof id === "string" && id.startsWith("p")) {
            return parseInt(id.substring(1)) || 0;
          }
          return parseInt(id) || 0;
        })
        .filter((id) => !isNaN(id));
      nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    }

    const projectId = `p${nextId}`;

    const newProject = {
      id: projectId,
      title_en: projectData.title_en || "",
      title_ar: projectData.title_ar || "",
      desc_en: projectData.desc_en || "",
      desc_ar: projectData.desc_ar || "",
      date: projectData.date || new Date().toISOString().split("T")[0],
      href: projectData.href || "ourProjects.html",
      img: projectData.img || "",
      category: projectData.category || "general",
      featured: projectData.featured || false,
      created_at: new Date().toISOString().split("T")[0],
    };

    projects.push(newProject);

    if (saveProjects(projects)) {
      return {
        success: true,
        message: "تم إضافة المشروع بنجاح",
        project: newProject,
      };
    } else {
      return {
        success: false,
        error: "فشل حفظ البيانات",
      };
    }
  }

  // Update project
  function updateProject(projectId, projectData) {
    const projects = getProjects();
    const projectIndex = projects.findIndex((p) => p.id === projectId);

    if (projectIndex === -1) {
      return {
        success: false,
        error: "المشروع غير موجود",
      };
    }

    // Update project
    if (projectData.title_en !== undefined) {
      projects[projectIndex].title_en = projectData.title_en;
    }
    if (projectData.title_ar !== undefined) {
      projects[projectIndex].title_ar = projectData.title_ar;
    }
    if (projectData.desc_en !== undefined) {
      projects[projectIndex].desc_en = projectData.desc_en;
    }
    if (projectData.desc_ar !== undefined) {
      projects[projectIndex].desc_ar = projectData.desc_ar;
    }
    if (projectData.date !== undefined) {
      projects[projectIndex].date = projectData.date;
    }
    if (projectData.href !== undefined) {
      projects[projectIndex].href = projectData.href;
    }
    if (projectData.img !== undefined) {
      projects[projectIndex].img = projectData.img;
    }
    if (projectData.category !== undefined) {
      projects[projectIndex].category = projectData.category;
    }
    if (projectData.featured !== undefined) {
      projects[projectIndex].featured = projectData.featured;
    }

    if (saveProjects(projects)) {
      return {
        success: true,
        message: "تم تحديث المشروع بنجاح",
        project: projects[projectIndex],
      };
    } else {
      return {
        success: false,
        error: "فشل حفظ البيانات",
      };
    }
  }

  // Delete project
  function deleteProject(projectId) {
    const projects = getProjects();
    const projectIndex = projects.findIndex((p) => p.id === projectId);

    if (projectIndex === -1) {
      return {
        success: false,
        error: "المشروع غير موجود",
      };
    }

    projects.splice(projectIndex, 1);

    if (saveProjects(projects)) {
      return {
        success: true,
        message: "تم حذف المشروع بنجاح",
      };
    } else {
      return {
        success: false,
        error: "فشل حفظ البيانات",
      };
    }
  }

  // Export functions
  window.ProjectsStorage = {
    getProjects,
    saveProjects,
    addProject,
    updateProject,
    deleteProject,
  };
})();
