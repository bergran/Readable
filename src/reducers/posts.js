import {
    FILL_POST,
    FILL_POST_BY_CATEGORY,
    MORE_POST_SCORE,
    LESS_POST_SCORE,
    ADD_POST
} from '../actions/post'

export const posts = (state = [], action) => {
  switch (action.type) {
    case FILL_POST:
      return [].concat(
        action.posts.map(posts => ({...posts, comments: 0}))
      );
      case MORE_POST_SCORE:
          const post = state.filter(post => post.id === action.post)[0]
          post.voteScore += action.score;
          return [].concat(state);
      case LESS_POST_SCORE:
          const post1 = state.filter(post => post.id === action.post)[0]
          post1.voteScore -= action.score;
          return [].concat(state);
      case FILL_POST_BY_CATEGORY:
        return [].concat(state.filter(post =>
            post.category !== action.category),
            action.posts
        );
      case ADD_POST:
          return [].concat(state.filter(post => post.id !== action.post.id), action.post)
    default:
      return state
  }
}
