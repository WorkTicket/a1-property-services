const staticFallback = {
  rating: 5.0,
  totalCount: 5,
  source: 'config',
  reviews: [
    { author: 'Ashley K.', rating: 5, text: 'We got multiple estimates from different companies and settled on A1, and we could not have been happier with our decision!', relativeTime: '3 weeks ago' },
    { author: 'Peggy G.', rating: 5, text: 'Mac has been a valuable resource over the years. Everything from demolition of a basement, planting trees, roofing and lawn care.', relativeTime: '2 years ago' },
    { author: 'John D.', rating: 5, text: 'Mac and his team did an outstanding job on my retaining wall. I was very pleased with his fast and reliable services.', relativeTime: '3 years ago' },
  ],
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function handleReviews(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  const apiKey = env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return Response.json(staticFallback, { headers: CORS_HEADERS })
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/ChIJx1yIuk9V5YcRMqQd-z4_YIE?fields=rating,userRatingCount,reviews`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!res.ok) throw new Error(`Google Places API returned ${res.status}`)

    const data = await res.json()
    const reviews = (data.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Google User',
      rating: r.rating ?? 5,
      text: r.text?.text ?? '',
      relativeTime: r.relativePublishTimeDescription ?? '',
    }))

    return Response.json(
      { rating: data.rating ?? staticFallback.rating, totalCount: data.userRatingCount ?? staticFallback.totalCount, reviews, source: 'google-places' },
      { headers: { ...CORS_HEADERS, 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } },
    )
  } catch {
    return Response.json(staticFallback, { headers: CORS_HEADERS })
  }
}
