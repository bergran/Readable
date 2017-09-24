import { fillCategories, addCategoryPost } from '../actions/categories'
import { fillPost } from '../actions/post'
import * as API from '../utils/api'

export const fillCategoriesThunk = next => dispatch => {
  return API.getCategories()
    .then(categories => {
      dispatch(fillCategories(categories))
    })
}

export const fillCategoriesPosts = next => dispatch => {
  Promise.all([
    API.getCategories(),
    API.getAllPost()
  ]).then(([categories, posts]) => {
    dispatch(fillCategories(categories))
    dispatch(fillPost(posts))
  })

  return Promise.resolve()
}
