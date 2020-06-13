import { SET_CURRENT_USER } from '../actionTypes'

const initialState = {
    user: {},
    isAuthenticated: false
}

export default (state = initialState, action) =>{
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                user: action.user,
                isAuthenticated: !!Object.keys(action.user).length // returns the value of the true(!!) boolean value(E.g, value > 0)
            }
        default:
            return state
    }
}