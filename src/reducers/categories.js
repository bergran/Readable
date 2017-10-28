import { FILL_CATEGORIES } from '../actions/categories'

export const categories = (state = {}, action) => {
  switch (action.type) {
    case FILL_CATEGORIES:
      const categoriesRaw = action.categories
      return categoriesRaw.reduce((prevState, category) => {
        return {
          ...prevState,
          [category.name]: {
            path: category.path,
          }
        }
      }, {})
    default:
      return state
  }
}
