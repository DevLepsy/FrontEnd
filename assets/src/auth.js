export function updateNavBasedOnAuthState() {
  const loginLink = document.getElementById("loginLink");

  if (loginLink) {
    if (sessionStorage.getItem("accessToken")) {
      loginLink.textContent = "logout";
      loginLink.href = "#";
    } else {
      loginLink.textContent = "login";
      loginLink.href = "./login.html";
    }
  } else {
    console.warn("Element with ID 'loginLink' not found in the DOM.");
  }
}

export function handleLoginClick(event) {
  if (event.target.textContent === "logout") {
    event.preventDefault();
    sessionStorage.removeItem("accessToken");
    updateNavBasedOnAuthState();
    window.location.replace("./index.html");
  } else if (event.target.textContent === "login") {
    // Ici, vous pouvez ajouter toute logique supplémentaire pour la connexion si nécessaire.
    window.location.replace("./index.html");
  }
}
