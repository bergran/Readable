import { fillCategories } from '../actions/categories'
import {
    fillPost,
    fillPostCategory,
    lessPostScore,
    morePostScore,
    addPost,
    deletePost,
    updatePostComments
} from '../actions/post'
import {
    fillComments,
    moreCommentScore,
    lessCommentScore,
    addComment,
    deleteComment
} from "../actions/comment";
import * as API from '../utils/api'

export const fillCategoriesThunk = next => dispatch => {
  return API.getCategories()
    .then(categories => {
        dispatch(fillCategories(categories))
    })
}

export const fillCommentsPost = post => dispatch => {
    return API.getCommentsPost(post)
        .then(comments => {
            dispatch(fillComments(comments))
            dispatch(updatePostComments(post, comments.length))
        })
}

export const fillPostsThunk = next => dispatch => {
    return API.getAllPost()
        .then(postsRaw => {
            dispatch(fillPost(postsRaw))
            postsRaw.forEach(post =>
                dispatch(fillCommentsPost(post.id))
            )
        })
}

export const fillPostCategoryThunk = category => dispatch => {
    return API.getPostsCategory(category)
        .then(posts => {
            dispatch(fillPostCategory(category, posts))
        })
}

export const voteUpPostThunk = post => dispatch => {
    return API.voteUpPost(post)
        .then(data => {
            dispatch(morePostScore(post))
        })
}

export const voteDownPostThunk = post => dispatch => {
    return API.voteDownPost(post)
        .then(data => {
            dispatch(lessPostScore(post))
        })
}

export const voteUpCommentThunk = comment => dispatch => {
    return API.voteUpComment(comment)
        .then(data => {
            dispatch(moreCommentScore(comment))
        })
}

export const voteDownCommentThunk = comment => dispatch => {
    return API.voteDownComment(comment)
        .then(data => {
            dispatch(lessCommentScore(comment))
        })
}

export const createPost = ({
    id,
    title,
    timestamp,
    body,
    author,
    category
}) => dispatch => {
    return API.addPost({
        id,
        title,
        body,
        author,
        category
    }).then(post => {
        dispatch(addPost(post))
    })
}

export const createComment = ({
    id,
    timestamp,
    body,
    author,
    parentId
}) => dispatch => {
    return API.addComment({
        id,
        timestamp,
        body,
        author,
        parentId
    }).then(data => {
        dispatch(addComment(data))
    })
}

export const editPost = (id, title, body) => dispatch => {
    return API.editPost(id, title, body)
        .then(data => {
                dispatch(addPost(data))
            }
        )
}

export const editComment = (id, body) => dispatch => {
    return API.editComment(id, Date.now(), body)
        .then(data => {
            dispatch(addComment(data))
        })
}

export const getPost = postId => dispatch => {
    return API.getPost(postId)
        .then(post => {
            dispatch(addPost(post))
        })
}

export const getComment = commentId => dispatch => {
    return API.getComment(commentId)
        .then(data => {
            dispatch(addComment(data))
        })
}

export const deletePostThunk = postId => dispatch => {
    return API.deletePost(postId)
        .then(data => {
            dispatch(deletePost(postId))
        })
}

export const deleteCommentThunk = commentId => dispatch => {
    return API.deleteComment(commentId)
        .then(data => {
            dispatch(deleteComment(commentId))
        })
}

