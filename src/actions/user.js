export const ADD_USER = 'ADD_USER'
export const ADD_USER_POST = 'ADD_USER_POST'
export const ADD_USER_COMMENT = 'ADD_USER_COMMENT'
export const ADD_SCORE_POST = 'ADD_SCORE_POST'
export const ADD_SCORE_COMMENT = 'ADD_SCORE_COMMENT'
export const EDIT_SCORE_POST = 'EDIT_SCORE_POST'
export const EDIT_SCORE_COMMENT = 'EDIT_SCORE_COMMENT'
export const REMOVE_SCORE_POST = 'REMOVE_SCORE_POST'
export const REMOVE_SCORE_COMMENT = 'REMOVE_SCORE_COMMENT'
export const REMOVE_USER_POST = 'REMOVE_USER_POST'
export const REMOVE_USER_COMMENT = 'REMOVE_USER_COMMENT'
export const REMOVE_USER = 'REMOVE_USER'

const addUser = username => ({
    type: ADD_USER,
    username,
})

const addUserPost = post => ({
    type: ADD_USER_POST,
    post
})

const addUserComment = comment => ({
    type: ADD_USER_COMMENT,
    comment
})

const addScorePost = post => ({
    type: ADD_SCORE_POST,
    post
})

const addScoreComment = comment => ({
    type: ADD_SCORE_COMMENT,
    comment
})

const editScorePost = post => ({
    type: EDIT_SCORE_POST,
    post
})

const editScoreComment = comment => ({
    type: EDIT_SCORE_COMMENT,
    comment
})

const removeScorePost = post => ({
    type: REMOVE_SCORE_POST,
    POST
})

const removeScoreComment = comment => ({
    type: REMOVE_SCORE_COMMENT,
    comment
})

const removeUserPost = post => ({
    type: REMOVE_USER_POST,
    post
})

const removeUserComment = comment => ({
    type: REMOVE_USER_COMMENT,
    comment
})

const removeUser = user => ({
    type: REMOVE_USER,
    user
})

export {
    addUser,
    addUserPost,
    addUserComment,
    addScorePost,
    addScoreComment,
    editScorePost,
    editScoreComment,
    removeUserPost,
    removeUserComment,
    removeScorePost,
    removeScoreComment,
    removeUser
}