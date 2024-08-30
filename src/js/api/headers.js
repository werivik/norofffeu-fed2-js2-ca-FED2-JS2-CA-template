import { API_KEY } from "./constants";

export function headers(jsonBody) {
  const headers = new Headers();

  const token = localStorage.token;

  if (token) {
    headers.append("Authorization", `Bearer ${token}`)
  }

  if (jsonBody) {
    headers.append("Content-Type", "application/json");
  }

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY)
  }

  return headers;
}