import { gallery } from "./variables.js";
import { fetchProjects, fetchCategories } from "./api.js";
import { createFilterButtons, applyFilter } from "./filter.js";
import { emailElement, passwordElement, form } from "./domElements.js";
import { updateNavBasedOnAuthState, handleLoginClick } from "./auth.js";

let currentProjects = [];

function displayProjects(projects) {
  if (!projects || !Array.isArray(projects)) {
    console.error("Les projets ne sont pas un tableau valide:", projects);
    return;
  }

  if (gallery) {
    gallery.innerHTML = "";
  } else {
    console.error("L'élément 'gallery' est introuvable dans le DOM.");
  }

  projects.forEach((project) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = project.imageUrl;
    img.alt = project.title;

    // Vérification du type de project.title
    if (typeof project.title === "object") {
      console.error("project.title est un objet:", project.title);
    }

    figcaption.innerText = project.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    if (gallery) {
      gallery.appendChild(figure);
    } else {
      console.error("L'élément 'gallery' est introuvable dans le DOM.");
    }
  });
}

function updateEditModeButtons() {
  const editionButton = document.querySelector(".edition");
  const modifierButtons = document.querySelectorAll(".modifier");

  if (sessionStorage.getItem("accessToken")) {
    if (editionButton && editionButton instanceof HTMLElement) {
      editionButton.style.display = "flex";
    }
    if (modifierButtons.length) {
      modifierButtons.forEach((button) => {
        if (button instanceof HTMLElement) {
          button.style.display = "inline-block";
        }
      });
    }
  } else {
    if (editionButton && editionButton instanceof HTMLElement) {
      editionButton.style.display = "none";
    }
    if (modifierButtons.length) {
      modifierButtons.forEach((button) => {
        if (button instanceof HTMLElement) {
          button.style.display = "none";
        }
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    currentProjects = await fetchProjects();
    const categoriesData = await fetchCategories();

    const uniqueCategories = [
      ...new Set(categoriesData.map(({ name }) => name)),
    ];
    const categoryNames = ["Tous", ...uniqueCategories];

    displayProjects(currentProjects);
    createFilterButtons(
      categoryNames,
      applyFilter,
      currentProjects,
      displayProjects
    );

    updateEditModeButtons();
    updateNavBasedOnAuthState();

    const loginLink = document.getElementById("loginLink");
    if (loginLink) {
      loginLink.addEventListener("click", handleLoginClick);
    }

    if (form && emailElement && passwordElement) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = emailElement.value;
        const password = passwordElement.value;

        try {
          const response = await fetch(
            "http://" + window.location.hostname + ":5678/api/users/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem("accessToken", data.token);
            window.location.href = "./index.html";
          } else {
            const connexion = document.querySelector("div");
            const error = document.createElement("p");
            error.innerText = "Erreur dans l’identifiant ou le mot de passe";
            error.style.textAlign = "center";
            error.style.color = "red";
            error.style.marginBottom = "15px";
            connexion.insertBefore(error, connexion.lastElementChild);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.error("Une erreur est survenue:", error);
  }
});
