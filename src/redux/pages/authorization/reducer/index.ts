import { AuthReducerInterface } from './interfaces';
import jwtDecode from 'jwt-decode';
import { AuthActionsInterface } from '../constants/interfaces';
import * as types from '../constants/types';

const initialState: AuthReducerInterface = {
    login: {
        success: {
            status: 0
        },
        error: null
    },
    signUp: null,
    token: null,
};

const authReducer = (state = initialState, action: AuthActionsInterface): AuthReducerInterface => {
    switch(action.type) {
        case types.AUTH_SUCCESS:
            return {
                ...state,
                [action.name]: {
                    success: action.payload,
                    error: null
                }
            }
        case types.AUTH_FAIL:
            return {
                ...state,
                [action.name]: action.payload
            }
        case types.AUTH_TOKEN: 
            let payload: object = {};
                try {
                    payload = jwtDecode(action.token);
                } catch (e) {
                    console.log(e);
                }
            return {
                ...state,
                token: {
                    accessToken: action.token,
                    payload
                }
            }
        default:
            return initialState
    }
};

export default authReducer;