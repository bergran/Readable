import { categories } from './categories'
import { comments } from './comments'
import { posts } from './posts'
import { user } from './user'
import { combineReducers } from 'redux'


export const reducers = combineReducers({
    categories,
    comments,
    posts,
    user
})