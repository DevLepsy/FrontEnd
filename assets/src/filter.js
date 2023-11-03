import { gallery } from "./variables.js";

function filterProjects(projects, category) {
  if (category === "Tous") {
    return projects;
  }
  return projects.filter(
    (project) => project.category && project.category.name === category
  );
}

function applyFilter(category, projects, displayCallback) {
  const filteredProjects = filterProjects(projects, category);
  displayCallback(filteredProjects);
}

function createFilterButtons(
  categoryNames,
  applyFilterCallback,
  projects,
  displayCallback
) {
  const filterContainer = document.createElement("div");
  filterContainer.classList.add("filter-buttons");

  categoryNames.forEach((categoryName) => {
    const button = document.createElement("button");
    button.innerText = categoryName;
    button.classList.add("filter-btn");
    if (categoryName === "Tous") {
      button.classList.add("active");
    }
    button.addEventListener("click", function () {
      applyFilterCallback(categoryName, projects, displayCallback);
      document
        .querySelectorAll(".filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
    filterContainer.appendChild(button);
  });

  const portfolioSection = document.getElementById("portfolio");
  if (portfolioSection) {
    portfolioSection.insertBefore(filterContainer, gallery);
  } else {
    console.error("L'élément 'portfolio' est introuvable dans le DOM.");
  }
}

export { createFilterButtons, applyFilter };
