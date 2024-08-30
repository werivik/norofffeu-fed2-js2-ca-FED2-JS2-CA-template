
import { updatePost } from "../../api/post/update";
import { getQueryProperty } from "../../utilities/getQueryProperty";
import { processPostForm } from "./form";
import { viewPost } from "./read";

export async function onUpdatePost(event) {
  const data = processPostForm(event)
  const id = getQueryProperty("id");

  try {
    const { data: post } = await updatePost(id, data)
    viewPost(post.id)
  } catch (error) {
    alert(error)
  }
}