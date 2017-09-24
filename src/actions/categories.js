export const FILL_CATEGORIES = 'FILL_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORY_POST = 'EDIT_CATEGORY_POST'
export const REMOVE_CATEGORY_POST = 'REMOVE_CATEGORY_POST'
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY'

const fillCategories = categories => ({
  type: FILL_CATEGORIES,
  categories
})

const addCategory = category => ({
    type: ADD_CATEGORY,
    category
})

const addCategoryPost = (category, post) => ({
    type: ADD_CATEGORY_POST,
    category,
    post
})

const removeCategoryPost = (category, post) => ({
    type: REMOVE_CATEGORY_POST,
    category,
    post
})

const removeCategory = category => ({
    type: REMOVE_CATEGORY,
    category
})

export {
    fillCategories,
    addCategory,
    addCategoryPost,
    removeCategoryPost,
    removeCategory
}
