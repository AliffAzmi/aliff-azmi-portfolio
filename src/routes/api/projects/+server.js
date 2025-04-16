import { CMS_AA_URL } from '$env/static/private'

export async function GET ({ params, url }) {
  const limit = url.searchParams.get('limit') || 20

  const fields =
    'fields=title,summary,publishedAt,slug,redirect,time_completion'
  const populate = 'populate=cover&populate=tags'
  const filter = 'filters[$and][0][category][name][$eq]=Project'
  const sort = 'sort=publishedAt:desc'

  const query = `${CMS_AA_URL}/posts?${fields}&${populate}&${filter}&${sort}&pagination[pageSize]=${limit}`

  try {
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return new Response(JSON.stringify({ projects: data }))
  } catch (error) {
    return new Response({ message: error }, { status: 500 })
  }
}
