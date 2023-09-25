import {
  GRAPHQL_URL,
  GRAPHQL_API_KEY,
  GRAPH_BYPASS_CACHE,
  PUB_ID,
  PROP_ID
} from '$env/static/private'

export async function load ({ url, params }) {
  try {
    const query = `
        query get($publisher_id: String, $property_id: String) {
            stories(first: 100, skip: 0, publisher_id: $publisher_id, property_id: $property_id, series: "projects", bypass_cache_key: "${GRAPH_BYPASS_CACHE}") {
                id
                title
                sid
                image_feat_single
                summary
                tags
                date_pub
                date_pubh
                category
				redirect
            }
        }`
    const variables = {
      api_key: GRAPHQL_API_KEY,
      publisher_id: PUB_ID,
      property_id: PROP_ID
    }
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })
    // const data = await response.json()
    // return new Response(JSON.stringify({ ...data }))
    return {
      status: 200,
      body: {
        // projects: data?.data?.stories
        projects: []
      }
    }
  } catch (error) {
    // return new Response({ message: error }, { status: 500 })
    return {
      status: 500,
      body: {
        projects: []
      }
    }
  }
}

export async function POST ({ request, response }) {
  return new Response(JSON.stringify({ message: 'Some Get Endpoint' }), {
    status: 200
  })
}
