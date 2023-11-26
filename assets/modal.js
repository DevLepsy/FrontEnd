//****** FUNCTIONS ******//

//Add or Remove "hidden" class for display or hide Element.
function displayHideElement(element) {
  element.classList.toggle("hidden");
}

// ****MODAL BASICS : CLOSE, OPEN, RETURN BUTTON ETC ...****//
// display or hide modalSection
function displayHideModal() {
  const divEditionGallery = document.getElementById("divEditionGallery");
  // @ts-ignore
  divEditionGallery.addEventListener("click", function () {
    // @ts-ignore
    displayHideElement(modalSection);
  });

  // @ts-ignore
  modalSection.addEventListener("click", (event) => {
    //if click it's ONLY on the backgound's modal : close it.
    // @ts-ignore
    if (event.target === modalSection) {
      // @ts-ignore
      displayHideElement(modalSection);
    }
  });
  //if click top-left cross : close modal.
  // @ts-ignore
  modalCrossClose.addEventListener("click", () =>
    // @ts-ignore
    displayHideElement(modalSection)
  );
}

//Navigation in the modal.
function modalNavigation() {
  //if click on "ajouter une photo" button: navigate to "ajout photo"
  // @ts-ignore
  modalButtonAddPicture.addEventListener("click", () => {
    // @ts-ignore
    displayHideElement(modalEditionGallery);
    // @ts-ignore
    displayHideElement(modalAddProject);
    // @ts-ignore
    displayHideElement(modalArrowReturn);
  });

  //if click on arrowLeft: return to "edition gallery"
  // @ts-ignore
  modalArrowReturn.addEventListener("click", () => {
    // @ts-ignore
    displayHideElement(modalEditionGallery);
    // @ts-ignore
    displayHideElement(modalAddProject);
    // @ts-ignore
    displayHideElement(modalArrowReturn);
  });
}

// **** GALLERY ****//
//generate works in modal
async function modalGenerateWorks() {
  // console.log("init ModalgenerationWorks");
  await fetchWorks();

  // @ts-ignore
  modalGallery.innerHTML = "";
  // @ts-ignore
  works.forEach(function (work) {
    const workElement = document.createElement("figure");
    const imageWork = document.createElement("img");
    const textWork = document.createElement("p");
    const dragWork = document.createElement("img");
    const trashWork = document.createElement("img");

    imageWork.src = work.imageUrl;
    imageWork.alt = work.title;

    textWork.innerText = "éditer";

    dragWork.src = "./assets/icons/Move.svg";
    dragWork.alt = "Button Drag&Drop";
    dragWork.classList.add("drag");

    trashWork.src = "./assets/icons/trash.svg";
    trashWork.alt = "Button Trash";
    trashWork.title = "suppression de la photo";
    trashWork.classList.add("trash");
    trashWork.dataset.workId = work.id;
    trashWork.addEventListener("click", () => {
      let workId = work.id;
      delWork(workId);
    });

    workElement.appendChild(imageWork);
    workElement.appendChild(textWork);
    workElement.appendChild(dragWork);
    workElement.appendChild(trashWork);

    // @ts-ignore
    modalGallery.appendChild(workElement);
  });
}

//**** PICTURE PREVIEW ****//

//preview picture in "Ajout photo" :
function previewPicture() {
  // @ts-ignore
  sendPicture.addEventListener("change", () => {
    //fetch files info.
    // @ts-ignore
    let curFile = sendPicture.files;
    validTypeSize(curFile);
    if (validTypeSize(curFile)) {
      // @ts-ignore
      modalPreviewImg.src = URL.createObjectURL(curFile[0]);

      //hide
      // @ts-ignore
      displayHideElement(modalPreviewNoPicture);
      // @ts-ignore
      displayHideElement(modalPreviewInputPicture);
      // @ts-ignore
      displayHideElement(modalPreviewP);
      //display
      // @ts-ignore
      displayHideElement(modalPreviewImg);

      // @ts-ignore
      modalPreviewP.innerText = "jpg, png : 4mo max";
      // @ts-ignore
      modalPreviewP.style.color = "#444";
      validateFormGreen();
    }
  });
}

function resetPicture() {
  //display
  // @ts-ignore
  displayHideElement(modalPreviewNoPicture);
  // @ts-ignore
  displayHideElement(modalPreviewInputPicture);
  // @ts-ignore
  displayHideElement(modalPreviewP);
  //hide
  // @ts-ignore
  displayHideElement(modalPreviewImg);

  // clear input.
  // @ts-ignore
  sendPicture.value = null;
  // @ts-ignore
  modalPreviewImg.src = "";
  validateFormGreen();
}

// reset picture when you click on it.
function clickResetPicture() {
  // @ts-ignore
  modalPreviewImg.addEventListener("click", () => {
    resetPicture();
  });
}

//**** OTHER INPUTS *****/
//clear all input
function clearForm() {
  resetPicture();
  // @ts-ignore
  pictureTitle.value = "";
  // @ts-ignore
  pictureCategorie.value = 1;
}

//categories list in form
async function initCategorieSelect() {
  await fetchCategories();
  // @ts-ignore
  for (let i = 0; i < categories.length; i++) {
    // @ts-ignore
    const categorie = categories[i];
    const newcategorieSelect = document.createElement("option");
    newcategorieSelect.value = categorie.id;
    newcategorieSelect.innerText = categorie.name;
    // @ts-ignore
    pictureCategorie.appendChild(newcategorieSelect);
  }
}

//******* INPUT VALIDATION **********//
function validType(curFile) {
  // @ts-ignore
  for (let i = 0; i < fileTypes.length; i++) {
    // @ts-ignore
    if (curFile[0].type === fileTypes[i]) {
      return true;
    }
  }
  throw new Error(
    "Le type de fichier sélectionné n'est pas valide. Fichier autorisé : .jpeg , .png"
  );
}

function validSize(curFile) {
  // @ts-ignore
  if (curFile[0].size <= maxSize) {
    return true;
  }
  throw new Error("La taille du fichier n'est pas valide. Taille Max: 4Mo.");
}

function validTypeSize(curFile) {
  try {
    validType(curFile);
    validSize(curFile);
    return true;
  } catch (error) {
    errorMessage(error.message);
    return false;
  }
}

function errorMessage(message) {
  // @ts-ignore
  modalPreviewP.innerText = message;
  // @ts-ignore
  modalPreviewP.style.color = "red";
}

//listener on text input for update the validate button
function EventListenerTextInput() {
  // @ts-ignore
  pictureTitle.addEventListener("input", () => {
    validateFormGreen();
  });
}

// Form validate -> bouton turn on and green
function validateFormGreen() {
  if (
    // @ts-ignore
    !modalPreviewImg.classList.contains("hidden") &&
    // @ts-ignore
    !(pictureTitle.value === "") &&
    // @ts-ignore
    !(pictureCategorie.value === "")
  ) {
    // @ts-ignore
    modalValidateButton.style.backgroundColor = "#1D6154";
    // @ts-ignore
    modalValidateButton.style.cursor = "pointer";
    // @ts-ignore
    modalValidateButton.disabled = false;
  } else {
    //button disabled
    // @ts-ignore
    modalValidateButton.style.backgroundColor = "#A7A7A7";
    // @ts-ignore
    modalValidateButton.style.cursor = "auto";
    // @ts-ignore
    modalValidateButton.disabled = true;
  }
}

//******** FUNCTIONALITIES **********//
async function addWorks() {
  // @ts-ignore
  modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let token = localStorage.getItem("User");
    // console.log(token);

    const newWork = new FormData();
    // @ts-ignore
    newWork.append("image", sendPicture.files[0]);
    // @ts-ignore
    newWork.append("title", pictureTitle.value);
    // @ts-ignore
    newWork.append("category", pictureCategorie.value);

    // console.log("envoie");
    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newWork,
    })
      // @ts-ignore
      .then((response) => {
        //update galleries
        generateAllWorks();
        modalGenerateWorks();
        //reset form:
        clearForm();
        //return on gallery modal:
        // @ts-ignore
        displayHideElement(modalEditionGallery);
        // @ts-ignore
        displayHideElement(modalAddProject);
        // @ts-ignore
        displayHideElement(modalArrowReturn);
      })
      .catch((error) => console.log(error));
  });
}

async function delWork(workId) {
  let token = localStorage.getItem("User");
  await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    // @ts-ignore
    .then((response) => {
      generateAllWorks();
      modalGenerateWorks();
    })
    .catch((error) => console.log(error));
}
