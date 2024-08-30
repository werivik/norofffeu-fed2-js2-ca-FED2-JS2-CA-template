export function getQueryProperty(property) {
  const url = new URL(window.location);
  return url.searchParams.get(property);
}
