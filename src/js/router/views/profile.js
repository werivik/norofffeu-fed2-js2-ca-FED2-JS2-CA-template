import { readProfile } from "../../api/profile/read";
import { onUpdateProfile } from "../../ui/profile/update";
import { getCurrentUser } from "../../utilities/getCurrentUser";
import { getQueryProperty } from "../../utilities/getQueryProperty";

const username = getQueryProperty("username");
const form = document.forms.updateProfile;

try {
  const profile = username ? await readProfile(username) : getCurrentUser()

  document.querySelector('h1').innerText = profile.name
  document.querySelector('#email').href += profile.email
  document.querySelector('#email').innerText = profile.email
  document.querySelector('#avatar').src = profile.avatar.url
  document.querySelector('#avatar').alt = profile.avatar.alt
  document.querySelector('#banner').src = profile.banner.url
  document.querySelector('#banner').alt = profile.banner.alt

  form.name.value = profile.name
  form.avatar.value = profile.avatar.url
  form.avatarAlt.value = profile.avatar.alt
  form.banner.value = profile.banner.url
  form.bannerAlt.value = profile.banner.alt

  form.addEventListener("submit", onUpdateProfile)
} catch (error) {
  alert(error)
}


