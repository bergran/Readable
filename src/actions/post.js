export const FILL_POST = 'FILL_POST'
export const ADD_POST = 'ADD_POST'
export const FILL_POST_BY_CATEGORY = 'FILL_POST_BY_CATEGORY'
export const MORE_POST_SCORE = 'MORE_POST_SCORE'
export const LESS_POST_SCORE = 'LESS_POST_SCORE'
export const EDIT_BODY_POST = 'EDIT_BODY_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'

const fillPost = posts => ({
  type: FILL_POST,
  posts
})

const fillPostCategory = (category, posts) => ({
    type: FILL_POST_BY_CATEGORY,
    category,
    posts
})

const addPost = post => ({
  type: ADD_POST,
  post
})

const morePostScore = (post, score = 1) => ({
  type: MORE_POST_SCORE,
  post,
  score
})

const lessPostScore = (post, score = 1) => ({
  type: LESS_POST_SCORE,
  post,
  score
})

const editBodyPost = (post, body) => ({
  type: EDIT_BODY_POST,
  post,
  body
})

const deletePost = postId => ({
  type: DELETE_POST,
  postId
})

const updatePostComments = (post, commentsLength) => ({
    type: UPDATE_COMMENTS,
    post,
    commentsLength
})

export {
  fillPost,
  fillPostCategory,
  addPost,
  morePostScore,
  lessPostScore,
  editBodyPost,
  deletePost,
  updatePostComments
}
