import { FILL_POST, ADD_POST_COMMENT, DELETE_POST_COMMENT } from '../actions/post'

export const posts = (state = [], action) => {
  switch (action.type) {
    case FILL_POST:
      return [].concat(
        state,
        action.posts.map(posts => ({...posts, comments: 0}))
      )
    case ADD_POST_COMMENT:
      const posts = state.map(post => {
        if (post.id === action.post) {
          return {
            ...post,
            comments: post.comments + 1
          }
        } else {
            return post
        }
      })
      return posts
    case DELETE_POST_COMMENT:
        return state.map(post => {
            if (post.id === action.post) {
                return {
                    ...post,
                    comments: post.comments - 1
                }
            } else {
                return post
            }
        })
    default:
      return state
  }
}
