import { fillCategories } from '../actions/categories'
import {fillPost, fillPostCategory, lessPostScore, morePostScore, addPost} from '../actions/post'
import { updateTime } from "../actions/updateTime";
import { fillComments, moreCommentScore, lessCommentScore, addComment } from "../actions/comment";
import * as API from '../utils/api'

const timeToUpdate = process.env.REACT_APP_UPDATE_TIME_INTERVAL

export const fillCategoriesThunk = next => dispatch => {
  return API.getCategories()
    .then(categories => {
        dispatch(fillCategories(categories))
        return Promise.resolve('category')
    })
}

export const fillPostsThunk = next => dispatch => {
    return API.getAllPost()
        .then(postsRaw => {
            dispatch(fillPost(postsRaw))
        })
}

export const fillCommentsPost = post => dispatch => {
    return API.getCommentsPost(post)
        .then(comments => {
            dispatch(fillComments(comments))
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

export const getPost = postId => dispatch => {
    return API.getPost(postId)
        .then(post => {
            dispatch(addPost(post))
        })
}

export const updaterThunk = thunkAction => (timeRaw, next = '') =>  {
    const wrapper = dispatch => {
        const time = timeRaw && timeRaw[`${thunkAction.name}${next}`]
        if (!time || ((Date.now() - time) / 1000) >= timeToUpdate) {
            dispatch(thunkAction(next))
                .then(object => {
                    const newUpdate = Date.now()
                    dispatch(updateTime(newUpdate,  `${thunkAction.name}${next}`))
                })
        }
        return Promise.resolve(null)
    }
    return wrapper
}

