import {
	GRAPHQL_URL,
	GRAPHQL_API_KEY,
	GRAPH_BYPASS_CACHE,
	PUB_ID,
	PROP_ID
} from '$env/static/private'

export async function GET ({ url }) {
	let limit = url.searchParams.get('limit') || 4,
		series = url.searchParams.get('series') || 'projects'
	try {
		const query = `
        query get($publisher_id: String, $property_id: String) {
            stories(first: ${limit}, skip: 0, publisher_id: $publisher_id, property_id: $property_id, series: "${series}", bypass_cache_key: "${GRAPH_BYPASS_CACHE}") {
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
		const data = await response.json()
		return new Response(JSON.stringify({ ...data }))
	} catch (error) {
		console.log(error)
		return new Response({ message: error }, { status: 500 })
	}
}

export async function POST ({ request, response }) {
	return new Response(JSON.stringify({ message: 'Some Get Endpoint' }), { status: 200 })
}
