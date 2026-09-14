import { NextResponse } from 'next/server'
import { redactOwnerName } from '@/lib/google-reviews'

export const dynamic = 'force-static'

const staticFallback = {
  rating: 5.0,
  totalCount: 5,
  source: 'config' as const,
  reviews: [
    { author: 'Ashley K.', rating: 5, text: 'We got multiple estimates from different companies and settled on A1, and we could not have been happier with our decision!', relativeTime: '3 weeks ago' },
    { author: 'Peggy G.', rating: 5, text: 'A valuable resource over the years. Everything from demolition of a basement, planting trees, roofing and lawn care.', relativeTime: '2 years ago' },
    { author: 'John D.', rating: 5, text: 'The crew did an outstanding job on my retaining wall. I was very pleased with the fast and reliable services.', relativeTime: '3 years ago' },
  ],
}

type GooglePlaceReview = {
  authorAttribution?: { displayName?: string }
  rating?: number
  text?: { text?: string }
  relativePublishTimeDescription?: string
}

type GooglePlaceDetails = {
  rating?: number
  userRatingCount?: number
  reviews?: GooglePlaceReview[]
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
        cache: 'force-cache',
      },
    )

    if (!res.ok) throw new Error(`Google Places API returned ${res.status}`)

    const data = (await res.json()) as GooglePlaceDetails
    const reviews = (data.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Google User',
      rating: r.rating ?? 5,
      text: redactOwnerName(r.text?.text ?? ''),
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
