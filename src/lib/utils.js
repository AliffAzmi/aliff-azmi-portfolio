export const slugify = (name, id) => {
  const slug = `${name.replaceAll(' ', '-').toLowerCase()}#${btoa(id)}`
  return slug.trim()
}