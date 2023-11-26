let loginForm = document.querySelector(".loginForm");
// @ts-ignore
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  connection();
});

async function connection() {
  try {
    // @ts-ignore
    const email = document.getElementById("loginEmail").value;
    validateEmail(email);
    // @ts-ignore
    const password = document.getElementById("loginPassword").value;

    await performLogin(email, password);
  } catch (error) {
    displayErrorMessage(error.message);
  }
}

function validateEmail(email) {
  const emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegex.test(email)) {
    throw new Error("L'email n'est pas valide");
  }
}

async function performLogin(email, password) {
  const loginDetails = {
    email: email,
    password: password,
  };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginDetails),
  });

  if (!response.ok) {
    throw new Error("Problème d'authentification");
  }

  const loginResponse = await response.json();
  if (!loginResponse.token) {
    throw new Error("Email ou Mot de Passe incorrect");
  }

  window.localStorage.setItem("User", loginResponse.token);
  location.assign("./index.html");
}

function displayErrorMessage(message) {
  let pErrorMessage =
    document.getElementById("errorMessage") || createErrorMessageElement();
  pErrorMessage.innerText = message;
}

function createErrorMessageElement() {
  const loginPassword = document.getElementById("loginPassword");
  const pErrorMessage = document.createElement("p");
  pErrorMessage.id = "errorMessage";
  // @ts-ignore
  loginPassword.parentNode.insertBefore(
    pErrorMessage,
    // @ts-ignore
    loginPassword.nextSibling
  );
  return pErrorMessage;
}
