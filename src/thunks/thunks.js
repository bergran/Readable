import { fillCategories } from '../actions/categories'
import { fillPost, fillPostCategory } from '../actions/post'
import { updateTime } from "../actions/updateTime";
import { fillComments} from "../actions/comment";
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