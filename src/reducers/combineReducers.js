import { categories } from './categories'
import { comments } from './comments'
import { posts } from './posts'
import { popup } from "./popup";
import { combineReducers } from 'redux'

export const reducers = combineReducers({
    categories,
    comments,
    posts,
    popup
})