import { FILL_POST } from '../actions/post'

export const posts = (state = [], action) => {
  switch (action.type) {
    case FILL_POST:
      return [].concat(
        state,
        action.posts.map(posts => ({...posts, comments: []}))
      )
    default:
      return state
  }
}
