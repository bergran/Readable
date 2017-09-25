import { FILL_POST, ADD_POST_COMMENT } from '../actions/post'

export const posts = (state = [], action) => {
  switch (action.type) {
    case FILL_POST:
      return [].concat(
        state,
        action.posts.map(posts => ({...posts, comments: []}))
      )
    case ADD_POST_COMMENT:
      const posts = state.map(post => {
        if (post.id === action.post) {
          const comments = post.comments.filter(
            comment => comment !== action.comment
          )
          post.comments = comments.concat(action.comment)
          return post
        } else {
          return post
        }
      })
    default:
      return state
  }
}
