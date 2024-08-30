import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    await login(data);
    window.location.href = "/"
  } catch(error) {
    alert(error)
  }
}
