//****** FUNCTIONS ******//

//Add or Remove "hidden" class for display or hide Element.
function displayHideElement(element) {
  element.classList.toggle("hidden");
}

// ****MODAL BASICS : CLOSE, OPEN, RETURN BUTTON ETC ...****//
// display or hide modalSection
function displayHideModal() {
  const divEditionGallery = document.getElementById("divEditionGallery");
  divEditionGallery.addEventListener("click", function () {
    displayHideElement(modalSection);
  });

  modalSection.addEventListener("click", (event) => {
    //if click it's ONLY on the backgound's modal : close it.
    if (event.target === modalSection) {
      displayHideElement(modalSection);
    }
  });
  //if click top-left cross : close modal.
  modalCrossClose.addEventListener("click", () =>
    displayHideElement(modalSection)
  );
}

//Navigation in the modal.
function modalNavigation() {
  //if click on "ajouter une photo" button: navigate to "ajout photo"
  modalButtonAddPicture.addEventListener("click", () => {
    displayHideElement(modalEditionGallery);
    displayHideElement(modalAddProject);
    displayHideElement(modalArrowReturn);
  });

  //if click on arrowLeft: return to "edition gallery"
  modalArrowReturn.addEventListener("click", () => {
    displayHideElement(modalEditionGallery);
    displayHideElement(modalAddProject);
    displayHideElement(modalArrowReturn);
  });
}

// **** GALLERY ****//
//generate works in modal
async function modalGenerateWorks() {
  // console.log("init ModalgenerationWorks");
  await fetchWorks();

  modalGallery.innerHTML = "";
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

    modalGallery.appendChild(workElement);
  });
}

//**** PICTURE PREVIEW ****//

//preview picture in "Ajout photo" :
function previewPicture() {
  sendPicture.addEventListener("change", () => {
    //fetch files info.
    let curFile = sendPicture.files;
    validTypeSize(curFile);
    if (validTypeSize(curFile)) {
      modalPreviewImg.src = URL.createObjectURL(curFile[0]);

      //hide
      displayHideElement(modalPreviewNoPicture);
      displayHideElement(modalPreviewInputPicture);
      displayHideElement(modalPreviewP);
      //display
      displayHideElement(modalPreviewImg);

      modalPreviewP.innerText = "jpg, png : 4mo max";
      modalPreviewP.style.color = "#444";
      validateFormGreen();
    }
  });
}

function resetPicture() {
  //display
  displayHideElement(modalPreviewNoPicture);
  displayHideElement(modalPreviewInputPicture);
  displayHideElement(modalPreviewP);
  //hide
  displayHideElement(modalPreviewImg);

  // clear input.
  sendPicture.value = null;
  modalPreviewImg.src = "";
  validateFormGreen();
}

// reset picture when you click on it.
function clickResetPicture() {
  modalPreviewImg.addEventListener("click", () => {
    resetPicture();
  });
}

//**** OTHER INPUTS *****/
//clear all input
function clearForm() {
  resetPicture();
  pictureTitle.value = "";
  pictureCategorie.value = 1;
}

//categories list in form
async function initCategorieSelect() {
  await fetchCategories();
  for (let i = 0; i < categories.length; i++) {
    const categorie = categories[i];
    const newcategorieSelect = document.createElement("option");
    newcategorieSelect.value = categorie.id;
    newcategorieSelect.innerText = categorie.name;
    pictureCategorie.appendChild(newcategorieSelect);
  }
}

//******* INPUT VALIDATION **********//
function validType(curFile) {
  for (let i = 0; i < fileTypes.length; i++) {
    if (curFile[0].type === fileTypes[i]) {
      return true;
    }
  }
  throw new Error(
    "Le type de fichier sélectionné n'est pas valide. Fichier autorisé : .jpeg , .png"
  );
}

function validSize(curFile) {
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
  modalPreviewP.innerText = message;
  modalPreviewP.style.color = "red";
}

//listener on text input for update the validate button
function EventListenerTextInput() {
  pictureTitle.addEventListener("input", () => {
    validateFormGreen();
  });
}

// Form validate -> bouton turn on and green
function validateFormGreen() {
  if (
    !modalPreviewImg.classList.contains("hidden") &&
    !(pictureTitle.value === "") &&
    !(pictureCategorie.value === "")
  ) {
    modalValidateButton.style.backgroundColor = "#1D6154";
    modalValidateButton.style.cursor = "pointer";
    modalValidateButton.disabled = false;
  } else {
    //button disabled
    modalValidateButton.style.backgroundColor = "#A7A7A7";
    modalValidateButton.style.cursor = "auto";
    modalValidateButton.disabled = true;
  }
}

//******** FUNCTIONALITIES **********//
async function addWorks() {
  modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let token = localStorage.getItem("User");
    // console.log(token);

    const newWork = new FormData();
    newWork.append("image", sendPicture.files[0]);
    newWork.append("title", pictureTitle.value);
    newWork.append("category", pictureCategorie.value);

    // console.log("envoie");
    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newWork,
    })
      .then((response) => {
        //update galleries
        generateAllWorks();
        modalGenerateWorks();
        //reset form:
        clearForm();
        //return on gallery modal:
        displayHideElement(modalEditionGallery);
        displayHideElement(modalAddProject);
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
    .then((response) => {
      generateAllWorks();
      modalGenerateWorks();
    })
    .catch((error) => console.log(error));
}
