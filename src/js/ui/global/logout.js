import { onLogout } from "../../ui/auth/logout";

export function setLogoutListener() {
  const logoutButton = document.querySelector("button[name=logout]");

  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout)
  }
}