import { updateProfile } from "../../api/profile/update";
import { getCurrentUser } from "../../utilities/getCurrentUser";

export async function onUpdateProfile(event) {
  event.preventDefault();
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData.entries())
  const name = data.name
  delete data.name

  data.avatar = {
    url: data.avatar,
    alt: data.avatarAlt
  }

  delete data.avatarAlt

  data.banner = {
    url: data.banner,
    alt: data.bannerAlt
  }

  delete data.bannerAlt

  try {
    const profile = await updateProfile(name, data)
    if (getCurrentUser().name === name) {
      localStorage.user = JSON.stringify(profile)
    }
    window.location.reload();
  } catch (error) {
    alert(error)
  }
}
