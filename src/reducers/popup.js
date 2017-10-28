import {
    UPDATE_CHILDREN,
    DELETE_CHILDREN
} from '../actions/popup'

export const popup = (state = null, action) => {
    switch (action.type) {
        case UPDATE_CHILDREN:
            return action.dialog
        case DELETE_CHILDREN:
            return null
        default:
            return state
    }
}