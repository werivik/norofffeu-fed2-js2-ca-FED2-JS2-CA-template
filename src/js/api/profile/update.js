import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function updateProfile(username, { avatar, banner }) {
  const body = JSON.stringify({ avatar, banner })

  const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
    headers: headers(body),
    method: "put",
    body
  })

  if (response.ok) {
    const { data: profile } = await response.json()
    return profile
  }

  throw new Error("Profile Error: Could not update profile information")
}
