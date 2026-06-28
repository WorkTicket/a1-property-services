import { NextResponse } from 'next/server'

const staticFallback = {
  rating: 5.0,
  totalCount: 5,
  source: 'config' as const,
  reviews: [
    { author: 'Ashley K.', rating: 5, text: 'We got multiple estimates from different companies and settled on A1, and we could not have been happier with our decision!', relativeTime: '3 weeks ago' },
    { author: 'Peggy G.', rating: 5, text: 'Mac has been a valuable resource over the years. Everything from demolition of a basement, planting trees, roofing and lawn care.', relativeTime: '2 years ago' },
    { author: 'John D.', rating: 5, text: 'Mac and his team did an outstanding job on my retaining wall. I was very pleased with his fast and reliable services.', relativeTime: '3 years ago' },
  ],
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY

  if (!apiKey) {
    return NextResponse.json(staticFallback)
  }

  try {
    const res = await fetch(
      'https://places.googleapis.com/v1/places/ChIJx1yIuk9V5YcRMqQd-z4_YIE?fields=rating,userRatingCount,reviews',
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
      },
    )

    if (!res.ok) throw new Error(`Google Places API returned ${res.status}`)

    const data = await res.json()
    const reviews = (data.reviews ?? []).map((r: any) => ({
      author: r.authorAttribution?.displayName ?? 'Google User',
      rating: r.rating ?? 5,
      text: r.text?.text ?? '',
      relativeTime: r.relativePublishTimeDescription ?? '',
    }))

    return NextResponse.json({
      rating: data.rating ?? staticFallback.rating,
      totalCount: data.userRatingCount ?? staticFallback.totalCount,
      reviews,
      source: 'google-places',
    })
  } catch {
    return NextResponse.json(staticFallback)
  }
}
