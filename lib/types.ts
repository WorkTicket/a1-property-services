export type GoogleReviewData = {
  rating: number
  totalCount: number
  reviews: {
    author: string
    rating: number
    text: string
    relativeTime: string
  }[]
  source: 'google-places' | 'config'
}
