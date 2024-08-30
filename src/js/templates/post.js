export function postTemplate({ id, title, body, author, reactions, tags, media, comments }) {
  const template = document.createElement("li");
  template.innerHTML = `<a href="/post/?id=${id}"><b>${title}</b> <i>by ${author.name}</i></a>`
  return template
}