import { fillCategories, addCategoryPost } from '../actions/categories'
import { fillPost } from '../actions/post'
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

export const fillCategoriesPosts = next => dispatch => {
  Promise.all([
      dispatch(fillCategoriesThunk()),
      dispatch(fillPostsThunk())
  ]).then(([categories, posts]) => {
    posts.forEach(post => {
        dispatch(addCategoryPost(post.category, post.id))
    })
  })


  return Promise.resolve()
}

