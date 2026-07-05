import { onRequest as __api_reindex_js_onRequest } from "C:\\Users\\Slay3r\\Downloads\\a1pslandscape.com\\functions\\api\\reindex.js"
import { onRequest as __api_reviews_js_onRequest } from "C:\\Users\\Slay3r\\Downloads\\a1pslandscape.com\\functions\\api\\reviews.js"

export const routes = [
    {
      routePath: "/api/reindex",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_reindex_js_onRequest],
    },
  {
      routePath: "/api/reviews",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_reviews_js_onRequest],
    },
  ]