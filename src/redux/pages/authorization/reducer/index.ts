import { AuthReducerInterface } from './interfaces';
import { authActions } from '../constants/interfaces';
import * as types from '../constants/types';

const initialState: AuthReducerInterface = {
    login: null,
    signUp: null
};

const authReducer = (state = initialState, action: authActions): AuthReducerInterface => {
    switch(action.type) {
        case types.AUTH_SUCCESS:
            return {
                ...state,
                [action.name]: action.payload
            }
        case types.AUTH_FAIL:
            return {
                ...state,
                [action.name]: action.payload
            }
        default:
            return initialState
    }
};

export default authReducer;