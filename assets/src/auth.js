export function updateNavBasedOnAuthState() {
  const loginLink = document.getElementById("loginLink");
  if (sessionStorage.getItem("accessToken")) {
    loginLink.textContent = "Logout";
    loginLink.href = "#";
  } else {
    loginLink.textContent = "Login";
    loginLink.href = "./login.html";
  }
}

export function handleLoginClick(event) {
  if (event.target.textContent === "Logout") {
    event.preventDefault();
    sessionStorage.removeItem("accessToken");
    updateNavBasedOnAuthState();
    window.location.href = "./index.html";
  }
}
