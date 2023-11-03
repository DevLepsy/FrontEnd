import { updateNavBasedOnAuthState, handleLoginClick } from "./auth.js";
import { login } from "./api.js";

const form = document.querySelector("form");
const loginLinkElement = document.getElementById("loginLink");
const connexion = document.querySelector("div");

if (loginLinkElement) {
  loginLinkElement.addEventListener("click", handleLoginClick);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const { email, password } = e.target.elements; // Destructuration

  try {
    const response = await login(email.value, password.value);
    sessionStorage.setItem("accessToken", response.token);
    window.location.href = "./index.html";
  } catch (error) {
    // Suppression du message d'erreur précédent s'il existe
    const existingError = document.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";
    errorMessage.classList.add("error-message");
    errorMessage.style.textAlign = "center";
    errorMessage.style.color = "red";
    errorMessage.style.marginBottom = "15px";
    connexion.insertBefore(errorMessage, connexion.lastElementChild);
  }
});

updateNavBasedOnAuthState();
