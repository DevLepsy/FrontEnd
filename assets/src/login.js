import { updateNavBasedOnAuthState, handleLoginClick } from "./auth.js";
import { login } from "./api.js";

const form = document.querySelector("form");

// Ajoute un gestionnaire d'événements pour le lien de connexion/logout
const loginLinkElement = document.getElementById("loginLink");

if (loginLinkElement) {
  loginLinkElement.addEventListener("click", handleLoginClick);
}

form.addEventListener("submit", async (e) => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  e.preventDefault();
  try {
    const response = await login(email, password);
    if (response === "failure") {
      const connexion = document.querySelector("div");
      const error = document.createElement("p");
      error.innerText = `"Erreur dans l’identifiant ou le mot de passe"`;
      error.style.textAlign = "center";
      error.style.color = "red";
      error.style.marginBottom = "15px";
      connexion.insertBefore(error, connexion.lastElementChild);
    } else {
      sessionStorage.setItem("accessToken", response.token);
      window.location.href = "./index.html";
    }
  } catch (error) {
    console.log(error);
  }
});

// Mettre à jour le lien de navigation lors du chargement de la page
updateNavBasedOnAuthState();
