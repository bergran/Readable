import { fillCategories, addCategoryPost } from '../actions/categories'
import { fillPost, addPostComment } from '../actions/post'
import { addComment } from "../actions/comment";
import * as API from '../utils/api'
import {categories} from "../reducers/categories";

export const fillCategoriesThunk = next => dispatch => {
  return API.getCategories()
    .then(categories => {
        dispatch(fillCategories(categories))
        return categories
    })
}

export const fillPostsThunk = next => dispatch => {
    const posts = API.getAllPost()
        .then(postsRaw => {
            dispatch(fillPost(postsRaw))
            return postsRaw
        })
    return Promise.resolve(posts)
}

export const fillCommentsPost = posts => dispatch => {
    Promise.all(
        posts.map(post => API.getCommentsPost(post.id))
        ).then(commentsByPosts => {
        commentsByPosts.forEach(commentsPost => {
            commentsPost.forEach(comment => {
                dispatch(addComment(comment))
                dispatch(addPostComment(comment.parentId, comment.id))
            })
        })
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

