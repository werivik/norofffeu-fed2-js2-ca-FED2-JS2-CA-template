import { readPost } from "../../api/post/read";
import { onUpdatePost } from "../../ui/post/update";
import { getQueryProperty } from "../../utilities/getQueryProperty";

const id = getQueryProperty("id");

try {
  const post = await readPost(id, true, true, true)

  const form = document.forms.editPost;

  form.title.value = post.title
  form.body.value = post.body
  form.tags.value = post.tags.join(", ")

  if (post.media) {
    form.media.value = post.media.url;
    form.alt.value = post.media.alt;
  }

  form.addEventListener("submit", onUpdatePost)

} catch(error) {
  alert(error)
}

