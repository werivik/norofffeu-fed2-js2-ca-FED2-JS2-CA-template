import { readPosts } from "../../api/post/read";
import { postTemplate } from "../../templates/post";

if (localStorage.token) {
  document.querySelector("#content").innerHTML = ""

  const { data: posts, meta } = await readPosts();

  const postTemplates = posts.map(postTemplate);

  document.querySelector("#content").append(...postTemplates)
}