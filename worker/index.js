import { handleReindex } from './api/reindex.js'
import { handleReviews } from './api/reviews.js'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/api/reindex') {
      return handleReindex(request, env)
    }

    if (path === '/api/reviews') {
      return handleReviews(request, env)
    }

    return env.ASSETS.fetch(request)
  }
}
