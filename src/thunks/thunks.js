import { fillCategories, addCategoryPost } from '../actions/categories'
import { fillPost, addPostComment } from '../actions/post'
import { updateTime } from "../actions/updateTime";
import { addComment } from "../actions/comment";
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
    const posts = API.getAllPost()
        .then(postsRaw => {
            dispatch(fillPost(postsRaw))
            return Promise.resolve('posts')
        })
    return Promise.resolve(posts)
}

export const fillCommentsPost = posts => dispatch => {
    Promise.all(
        posts.map(post => API.getCommentsPost(post.id))
        ).then(commentsByPosts => {
        commentsByPosts.forEach(commentsPost => {
            commentsPost.forEach(comment => {
                dispatch(addPostComment(comment.parentId))
            })
        })
        Promise.resolve('posts')
    })
}

export const fillCategoriesPosts = next => dispatch => {
  Promise.all([
      dispatch(fillCategoriesThunk()),
      dispatch(fillPostsThunk())
  ]).then(([categories, posts, commentsByPosts]) => {
    posts.forEach(post => {
        dispatch(addCategoryPost(post.category, post.id))
    })
    dispatch(fillCommentsPost(posts))
  })
  return Promise.resolve()
}

export const updaterThunk = thunkAction => (time, next = {}) =>  {
    const wrapper = dispatch => {
        if (!time || ((Date.now() - time) / 1000) >= timeToUpdate) {
            dispatch(thunkAction(...next))
                .then(object => {
                    const newUpdate = Date.now()
                    dispatch(updateTime(newUpdate,  object))
                })
        }
        return Promise.resolve(null)
    }
    return wrapper
}