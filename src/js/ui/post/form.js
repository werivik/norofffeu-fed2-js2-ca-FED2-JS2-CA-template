export function processPostForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData.entries())
  data.tags = data.tags.split(',').map(tag => tag.trim())

  if (data.media) {
    data.media = {
      url: data.media,
      alt: data.alt
    }
  } else {
    delete data.media
  }

  delete data.alt

  return data
}