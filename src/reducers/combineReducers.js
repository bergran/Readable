import { categories } from './categories'
import { comments } from './comments'
import { posts } from './posts'
import { user } from './user'
import { updateTime} from "./updateTime";
import { combineReducers } from 'redux'


export const reducers = combineReducers({
    categories,
    comments,
    posts,
    user,
    updateTime
})