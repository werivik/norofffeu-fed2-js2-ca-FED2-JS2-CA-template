import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost(postData, author = false, reactions = false, comments = false) {
  const body = JSON.stringify(postData);
  const url = new URL(API_SOCIAL_POSTS);
  url.searchParams.append("_author", author)
  url.searchParams.append("_reactions", reactions)
  url.searchParams.append("_comments", comments)

  const response = await fetch(url, {
    method: "post",
    headers: headers(body),
    body
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error("Content Error: Could not create post.")
}
