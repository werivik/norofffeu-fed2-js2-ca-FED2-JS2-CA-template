import { createPost } from "../../api/post/create";
import { viewPost } from "./read";

export async function onCreatePost(event) {
  const data = processPostForm(event)

  try {
    const { data: post } = await createPost(data)
    viewPost(post.id)
  } catch (error) {
    alert(error)
  }
}