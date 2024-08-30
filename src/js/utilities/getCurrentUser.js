export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.user)
  } catch {
    return null
  }
}