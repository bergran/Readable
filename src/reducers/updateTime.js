import { UPDATE_TIME } from '../actions/updateTime'

const initialState = {}

export const updateTime = (state = initialState, action) => {
    switch (action.type){
        case UPDATE_TIME:
            return {
                ...state,
                [action.object]: action.time
            }
        default:
            return state
    }
}