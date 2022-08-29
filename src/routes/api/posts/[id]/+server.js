import {
  NC_API_ENDPOINT,
  GRAPHQL_URL,
  GRAPHQL_API_KEY,
  GRAPH_BYPASS_CACHE,
  PUB_ID,
  PROP_ID
} from '$env/static/private'
import axios from 'axios'

export async function GET ({ params }) {
  let id = params.id || ''
  try {
    const query = `
        query get_story_item($publisher_id: String, $property_id: String, $id: String) {
            story(publisher_id: $publisher_id, property_id: $property_id, id: $id, bypass_cache_key: "${GRAPH_BYPASS_CACHE}") {
                id
                title
                sid
				image_feat
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
      property_id: PROP_ID,
      id: id
    }
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })
    const full_content = await getFullContent(id)
    const { data } = await response.json()
    return new Response(JSON.stringify({ ...data, full_content }))
  } catch (error) {
    return new Response({ message: error }, { status: 500 })
  }
}

const getFullContent = async id => {
  try {
    const fullContentData = await axios.post(`${NC_API_ENDPOINT}/s3`, {
      key: `data/contents/${id}`,
      bucket: 'api-data.newscraft.io',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let full_content = fullContentData.data || ''
    return full_content
  } catch (error) {
    return error.message
  }
}

export async function POST ({ request, response }) {
  return new Response(JSON.stringify({ message: 'Some Get Endpoint' }), {
    status: 200
  })
}
