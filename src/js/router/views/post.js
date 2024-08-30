import { readPost } from "../../api/post/read";
import { onDeletePost } from "../../ui/post/delete";
import { getCurrentUser } from "../../utilities/getCurrentUser";
import { getQueryProperty } from "../../utilities/getQueryProperty";

const me = getCurrentUser()

const id = getQueryProperty("id");

try {

  const post = await readPost(id, true, true, true)

  document.querySelector("h1").innerText = post.title;

  if (post.media) {
    document.querySelector("img").src = post.media.url;
    document.querySelector("img").alt = post.media.alt;
  } else {
    document.querySelector("img").remove()
  }

  if (post.author) {
    document.querySelector("#author-name").innerText = post.author.name
  } else {
    document.querySelector(".author").remove()
  }

  if (post.body) {
    document.querySelector("#content").innerText = post.body
  } else {
    document.querySelector("#content").remove()
  }

  if (post.author.name === me.name) {
    document.querySelector('#edit').href += post.id
    document.querySelector('button[name=delete]').dataset.id = post.id
    document.querySelector('button[name=delete]').addEventListener("click", onDeletePost)
  } else {
    document.querySelector('#edit').remove()
    document.querySelector('#delete').remove()
  }

} catch(error) {
  alert(error)
  window.location.href = "/"
}

