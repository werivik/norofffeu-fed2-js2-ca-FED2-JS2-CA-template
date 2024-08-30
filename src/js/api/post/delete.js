import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function deletePost(id) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    method: 'delete',
    headers: headers()
  });

  if (response.ok) {
    return `Post ${id} deleted successfully`
  }

  throw new Error(`Content Error: Could not delete Post ${id}`)
}
