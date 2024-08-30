import { API_NAMESPACE, API_SOCIAL_POSTS, API_SOCIAL_PROFILE_POSTS } from "../constants";
import { headers } from "../headers";

export async function readPost(
  id, 
  author = true,
  reactions = true,
  comments = true
) {
  const url = new URL(`${API_SOCIAL_POSTS}/${id}`);
  url.searchParams.append("_author", author)
  url.searchParams.append("_reactions", reactions)
  url.searchParams.append("_comments", comments)

  const response = await fetch(url, {
    headers: headers()
  })

  if (response.ok) {
    const { data: post, meta } = await response.json()
    return post
  }

  throw new Error("Content Error: Could not get post with ID: " + id)
}

export async function readPosts(
  perPage = 12,
  page = 1,
  tag = API_NAMESPACE,
  author = true,
  reactions = false,
  comments = false
) {
  const url = new URL(API_SOCIAL_POSTS);
  url.searchParams.append("limit", perPage)
  url.searchParams.append("page", page)
  url.searchParams.append("_tag", tag)
  url.searchParams.append("_author", author)
  url.searchParams.append("_reactions", reactions)
  url.searchParams.append("_comments", comments)

  const response = await fetch(url, {
    headers: headers()
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error("Content Error: Could not get list of posts.")
}

export async function readPostsByUser(
  name,
  perPage = 12,
  page = 1,
  tag = API_NAMESPACE,
  author = false,
  reactions = false,
  comments = false
) {
  const url = new URL(API_SOCIAL_PROFILE_POSTS(name));
  url.searchParams.append("limit", perPage)
  url.searchParams.append("page", page)
  url.searchParams.append("_tag", tag)
  url.searchParams.append("_author", author)
  url.searchParams.append("_reactions", reactions)
  url.searchParams.append("_comments", comments)

  const response = await fetch(url, {
    headers: headers()
  })

  if (response.ok) {
    return await response.json()
  }

  throw new Error(`Content Error: Could not get list of posts from user ${name}.`)
}
