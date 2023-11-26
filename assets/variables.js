let works = [];
let categories = [];
let categoryWorks = [];

const fileTypes = ["image/jpeg", "image/png"];

const maxSize = 4194304;

const modalSection = document.getElementById("modalSection");
const sendPicture = document.getElementById("sendPicture");
const modalPreviewImg = document.querySelector(".modalPreviewImg");
const modalPreviewNoPicture = document.querySelector(".modalPreviewNoPicture");
const modalPreviewInputPicture = document.querySelector(
  ".modalPreviewInputPicture"
);
const modalPreviewP = document.querySelector(".modalPreviewP");
const pictureCategorie = document.getElementById("pictureCategorie");
const modalValidateButton = document.querySelector(".modalValidateButton");
const pictureTitle = document.getElementById("pictureTitle");
const modalForm = document.getElementById("modalForm");
const modalButtonAddPicture = document.querySelector(".modalButtonAddPicture");
const modalEditionGallery = document.querySelector(".modalEditionGallery");
const modalAddProject = document.querySelector(".modalAddProject");
const modalArrowReturn = document.querySelector(".modalArrowReturn");
const modalCrossClose = document.querySelector(".modalCrossClose");
const modalGallery = document.querySelector(".modalGallery");
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
