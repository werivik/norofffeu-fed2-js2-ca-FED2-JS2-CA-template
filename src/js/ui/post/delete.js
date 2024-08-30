import { deletePost } from "../../api/post/delete";

export async function onDeletePost(event) {
  const id = event.target.dataset.id;

  try {
    await deletePost(id)
    window.location.href = "/"
  } catch (error) {
    alert(error)
  }
}