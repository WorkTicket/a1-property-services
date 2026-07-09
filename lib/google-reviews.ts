export type GoogleReviewStats = {
  rating: number
  totalCount: number
}

const staticFallback: GoogleReviewStats = {
  rating: 5.0,
  totalCount: 5,
}

/** Fetches live Google review stats for schema markup. Falls back to static values. */
export async function getGoogleReviewStats(): Promise<GoogleReviewStats> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  if (!apiKey) return staticFallback

  try {
    const res = await fetch(
      'https://places.googleapis.com/v1/places/ChIJx1yIuk9V5YcRMqQd-z4_YIE?fields=rating,userRatingCount',
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 86400 },
      },
    )

    if (!res.ok) return staticFallback

    const data = await res.json()
    return {
      rating: data.rating ?? staticFallback.rating,
      totalCount: data.userRatingCount ?? staticFallback.totalCount,
    }
  } catch {
    return staticFallback
  }
}
