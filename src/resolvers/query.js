import APP_CONTEXT_QUERY from '../graphql/app-context-query.graphql'

export default {
  auth(parent, arg, { cache }) {
    const { auth } = cache.readQuery({ query: APP_CONTEXT_QUERY })
    return auth
  },
}
