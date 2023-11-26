let loginForm = document.querySelector(".loginForm");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  connection();
});

async function connection() {
  try {
    const email = document.getElementById("loginEmail").value;
    checkEmail(email);
    const password = document.getElementById("loginPassword").value;

    await fetchLogin(email, password);
  } catch (error) {
    errorMessage(error.message);
  }
}

//check email format
function checkEmail(email) {
  let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegex.test(email)) {
    console.log("L'email n'est pas valide");
    throw new Error("L'email n'est pas valide");
  }
}

//request and checked login
async function fetchLogin(email, password) {
  const login = {
    email: email,
    password: password,
  };
  const loginJson = JSON.stringify(login);

  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: loginJson,
  })
    .then((response) => response.json())
    .then((loginResponse) => {
      // console.log("Requête ok");
      // console.log(loginResponse);
      if (!loginResponse.token) {
        console.log("Email et/ou Mot de Passe incorrect");
        throw new Error("Email et/ou Mot de Passe incorrect");
      } else {
        window.localStorage.setItem("User", loginResponse.token);
        // console.log(window.localStorage.getItem("User"));
        location.assign("./index.html");
      }
    });
}

//error management
function errorMessage(message) {
  let pErrorMessage = document.getElementById("errorMessage");

  if (!pErrorMessage) {
    let loginPassword = document.getElementById("loginPassword");
    pErrorMessage = document.createElement("p");
    pErrorMessage.id = "errorMessage";
    loginPassword.parentNode.insertBefore(
      pErrorMessage,
      loginPassword.nextSibling
    );
  }
  pErrorMessage.innerText = message;
}
