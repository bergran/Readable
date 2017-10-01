import { FILL_POST, FILL_POST_BY_CATEGORY } from '../actions/post'

export const posts = (state = [], action) => {
  switch (action.type) {
    case FILL_POST:
      return [].concat(
        action.posts.map(posts => ({...posts, comments: 0}))
      )
      case FILL_POST_BY_CATEGORY:
        return [].concat(state.filter(post =>
            post.category !== action.category),
            action.posts
        )
    default:
      return state
  }
}
