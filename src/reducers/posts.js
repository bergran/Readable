import { FILL_POST } from '../actions/post'

export const posts = (state = [], action) => {
  switch (action.type) {
    case FILL_POST:
      return [].concat(
        action.posts.map(posts => ({...posts, comments: 0}))
      )
    default:
      return state
  }
}
