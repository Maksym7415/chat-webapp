import { LoginActionsType, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actionTypes/loginActionTypes";
import { tokenData } from '../actionTypes/constantsActionTypes'

interface LoginState {
    tokens: tokenData,
    error: Error | string
}

const initialState: LoginState = {
    tokens: {
        accessToken: '',
        refreshToken: ''
    },
    error: ''
};

export default (state = initialState, action: LoginActionsType): LoginState => {
    console.log(action)
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                tokens: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}
