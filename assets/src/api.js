const API_CONFIG = {
  BASE_URL: "http://localhost:5678/api",
  ENDPOINTS: {
    WORKS: "/works",
    CATEGORIES: "/categories",
    LOGIN: "/users/login",
  },
};

async function fetchProjects() {
  const response = await fetch(
    API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.WORKS
  );
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function fetchCategories() {
  const response = await fetch(
    API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CATEGORIES
  );
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function login(email, password) {
  const response = await fetch(
    API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    return "failure";
  }
  return response.json();
}

export { fetchProjects, fetchCategories, login };
