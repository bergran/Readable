import { FILL_COMMENTS, ADD_COMMENT, MORE_COMMENT_SCORE, LESS_COMMENT_SCORE } from '../actions/comment'

export const comments = (state = [], action) => {
  switch (action.type) {
    case FILL_COMMENTS:
        return action.comments
    case ADD_COMMENT:
        return state.filter(comment => comment.id !== action.comment.id).concat(action.comment)
    case MORE_COMMENT_SCORE:
        const comment = state.filter(comment => comment.id === action.comment)[0]
        comment.voteScore += action.score
        return [].concat(state)
    case LESS_COMMENT_SCORE:
        const comment1 = state.filter(comment => comment.id === action.comment)[0]
        comment1.voteScore -= action.score
        return [].concat(state)
    default:
      return state
  }
}
