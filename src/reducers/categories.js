import { FILL_CATEGORIES, ADD_CATEGORY_POST } from '../actions/categories'

export const categories = (state = {}, action) => {
  switch (action.type) {
    case FILL_CATEGORIES:
      const categoriesRaw = action.categories
      return categoriesRaw.reduce((prevState, category) => {
        return {
          ...prevState,
          [category.name]: {
            path: category.path,
            posts: []
          }
        }
      }, {})
      case ADD_CATEGORY_POST:
        const categoryId = action.category
        const postId = action.post
        return {
            ...state,
            [categoryId]: {
                ...state[categoryId],
                posts: [].concat(state[categoryId].posts, postId)
            }
        }
    default:
      return state
  }
}
