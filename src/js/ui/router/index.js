export default function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      import("./views/home.js")
      break
    default:
      import("./views/notFound.js")
  }
}