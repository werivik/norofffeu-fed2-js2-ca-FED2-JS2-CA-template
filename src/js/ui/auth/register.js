import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    await register(data);
    window.location.href = "/auth/login/"
  } catch(error) {
    alert(error)
  }
}
