/********** FUNCTIONS **********/

// Function to fetch works data
async function fetchWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des travaux");
    }
    // @ts-ignore
    works = await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux:", error);
  }
}

// Function to fetch categories and store them in "categories" array
async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des catégories");
    }
    // @ts-ignore
    categories = await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
  }
}

// Function to remove specified classes from elements
function removeClass(elements, classRemoved) {
  elements.forEach((element) => {
    element.classList.remove(classRemoved);
  });
}

// Function to generate category buttons with event listeners
async function categoriesFilters() {
  await fetchCategories();
  createCategoryButton(0, "Tous"); // Category "All"

  // @ts-ignore
  categories.forEach((category) => {
    createCategoryButton(category.id, category.name);
  });
}

function createCategoryButton(id, text) {
  const button = document.createElement("button");
  button.dataset.id = id;
  button.textContent = text;
  // @ts-ignore
  filters.appendChild(button);
  addListenerToCategoryButton(button);
}

function addListenerToCategoryButton(button) {
  button.addEventListener("click", (event) => {
    const btnCategoriesElements = document.querySelectorAll(
      "#portfolio .filters button"
    );
    removeClass(btnCategoriesElements, "selected");
    createTableCategorieWorks(event.target.dataset.id);
    // @ts-ignore
    generateWorks(categoryWorks);
    event.target.classList.add("selected");
  });
}

function createTableCategorieWorks(idCategorie) {
  // @ts-ignore
  categoryWorks =
    idCategorie == 0
      ? // @ts-ignore
        works
      : // @ts-ignore
        works.filter((work) => work.categoryId == idCategorie);
}

async function generateAllWorks() {
  await fetchWorks();
  // @ts-ignore
  generateWorks(works);
}

function generateWorks(worksArray) {
  // @ts-ignore
  gallery.innerHTML = "";
  worksArray.forEach((work) => appendWorkToGallery(work));
}

function appendWorkToGallery(work) {
  const workElement = document.createElement("figure");
  const imageWork = document.createElement("img");
  imageWork.src = work.imageUrl;
  imageWork.alt = work.title;
  const titleWork = document.createElement("figcaption");
  titleWork.innerText = work.title;

  workElement.append(imageWork, titleWork);
  // @ts-ignore
  gallery.appendChild(workElement);
}

/******** ADMINISTRATION MODE ********/

function logout() {
  let login = document.getElementById("login");
  // @ts-ignore
  login.innerText = "logout";
  // @ts-ignore
  login.href = "./index.html";
  // @ts-ignore
  login.addEventListener("click", () => {
    localStorage.removeItem("User");
    // @ts-ignore
    displayHideElement(filters);
  });
}

async function adminMode() {
  if (localStorage.getItem("User")) {
    console.log("Connected !");
    setupAdminInterface();
  }
}

function setupAdminInterface() {
  setupEditionButton(
    "body",
    "divEditionMain",
    "EditionWhite.png",
    "Mode édition",
    "publier les changements",
    "header"
  );
  setupEditionButton("figure", "divEditionPfp", "EditionBlack.png", "modifier");
  setupEditionButton(
    ".portfolioTitle",
    "divEditionGallery",
    "EditionBlack.png",
    "modifier"
  );

  logout();
  // @ts-ignore
  displayHideElement(filters);
  // @ts-ignore
  modalGenerateWorks();
  // @ts-ignore
  displayHideModal();
  // @ts-ignore
  modalNavigation();
  // @ts-ignore
  previewPicture();
  // @ts-ignore
  clickResetPicture();
  // @ts-ignore
  initCategorieSelect();
  // @ts-ignore
  validateFormGreen();
  // @ts-ignore
  EventListenerTextInput();
  // @ts-ignore
  addWorks();
}

function setupEditionButton(
  parentSelector,
  divId,
  icon,
  text,
  extraContent = "",
  insertBeforeSelector = ""
) {
  const parentElement = document.querySelector(parentSelector);
  const divEdition = document.createElement("div");
  divEdition.id = divId;
  divEdition.innerHTML = `
    <img src="./assets/icons/${icon}">
    <p>${text}</p>
    ${extraContent ? `<div>${extraContent}</div>` : ""}
  `;

  if (insertBeforeSelector) {
    const insertBeforeElement = document.querySelector(insertBeforeSelector);
    parentElement.insertBefore(divEdition, insertBeforeElement);
  } else {
    parentElement.appendChild(divEdition);
  }
}

// ... (rest of the functions)

/********** SCRIPT **********/
generateAllWorks();
categoriesFilters();
adminMode();
