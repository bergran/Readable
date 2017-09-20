export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

const addPost = post => ({
  type: ADD_POST,
  post
})

const editPost = post, postMod => ({
  type: EDIT_POST,
  post,
  postMod
})

const deletePost = post => ({
  type: DELETE_POST,
  post
})
