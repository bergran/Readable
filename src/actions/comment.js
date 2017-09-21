export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT_BODY = 'EDIT_COMMENT_BODY'
export const MORE_COMMENT_SCORE = 'MORE_COMMENT_SCORE'
export const LESS_COMMENT_SCORE = 'LESS_COMMENT_SCORE'
export const DELETE_COMMENT_POST = 'DELETE_COMMENT_POST'
export const DELETE_COMMENT = 'DELETE_COMMENT'

const addComment = comment => ({
    type: ADD_COMMENT,
    comment
})

const editCommentBody = (comment, body) => ({
    type: EDIT_COMMENT_BODY,
    comment,
    body
})

const moreCommentScore = (comment, score = 1) => ({
    type: MORE_COMMENT_SCORE,
    comment
})

const lessCommentScore = (comment, score = 1) => ({
    type: LESS_COMMENT_SCORE,
    comment
})

const deleteCommentPost = (comment, post) => ({
    type: DELETE_COMMENT_POST,
    comment,
    post
})

const deleteComment = comment => ({
    type: DELETE_COMMENT,
    comment
})

export {
    addComment,
    editCommentBody,
    moreCommentScore,
    lessCommentScore,
    deleteComment,
    deleteCommentPost
}