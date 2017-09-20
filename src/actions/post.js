export const ADD_POST = 'ADD_POST'
export const ADD_POST_COMMENT = 'ADD_POST_COMMENT'
export const MORE_POST_SCORE = 'MORE_POST_SCORE'
export const LESS_POST_SCORE = 'LESS_POST_SCORE'
export const EDIT_BODY_POST = 'EDIT_BODY_POST'
export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT'
export const DELETE_POST = 'DELETE_POST'

const addPost = post => ({
  type: ADD_POST,
  post
})

const addPostComment = (post, comment) => ({
  type: ADD_POST_COMENT,
  post,
  comment
})

const morePostScore = post => ({
  type: MORE_POST_SCORE,
  post
})

const lessPostScore = post => ({
  type: LESS_POST_SCORE,
  post
})

const editBodyPost = (post, body) => ({
  type: EDIT_BODY_POST,
  post,
  body
})

const deletePostComment = post, comment => ({
  type: DELETE_POST_COMMENT,
  post,
  comment
})

const deletePost = post => ({
  type: DELETE_POST,
  post
})

// TODO: Add thunk methods to Middleware

export {
  addPost,
  addPostComment,
  morePostScore,
  lessPostScore,
  editBodyPost,
  deletePostComment,
  deletePost
}
