import { ADD_USER } from '../actions/user'

const userInitialState = {
  name: '',
  posts: [],
  comments: []
}

export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        name: action.name
      }
    default:
      return state
  }
}
