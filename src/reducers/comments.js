import { ADD_COMMENT } from '../actions/comment'

export const comments = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT :
        return state.filter(comment => comment.id !== action.comment.id).concat(action.comment)
    default:
      return state
  }
}
