import { API_CONFIG } from "./variables.js";

async function makeRequest(
  endpoint,
  method = "GET",
  bodyData = null,
  customHeaders = {}
) {
  const headers = { "Content-Type": "application/json", ...customHeaders };

  const token = sessionStorage.getItem("accessToken");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const body = bodyData ? JSON.stringify(bodyData) : null;

  const response = await fetch(API_CONFIG.BASE_URL + endpoint, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    let errorMsg = `Erreur ${response.status}: ${response.statusText}`;
    try {
      const responseData = await response.json();
      if (responseData && responseData.error) {
        errorMsg = responseData.error;
      }
    } catch (error) {}

    throw {
      status: response.status,
      statusText: response.statusText,
      message: errorMsg,
      body: await response.json(),
    };
  }

  return response.json();
}

async function fetchProjects() {
  return makeRequest(API_CONFIG.ENDPOINTS.WORKS);
}

async function fetchCategories() {
  return makeRequest(API_CONFIG.ENDPOINTS.CATEGORIES);
}

async function login(email, password) {
  return makeRequest(API_CONFIG.ENDPOINTS.LOGIN, "POST", { email, password });
}

export { fetchProjects, fetchCategories, login };
