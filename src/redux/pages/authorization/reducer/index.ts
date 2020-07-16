import { AuthReducerInterface } from './interfaces';
import jwtDecode from 'jwt-decode';
import { AuthActionsInterface } from '../constants/interfaces';
import * as types from '../constants/types';

const getKeyValue = <T extends object, U extends keyof T>(key: U | never) => (obj: T | never) =>
  obj[key];


const initialState: AuthReducerInterface = {
    login: {
        success: {
            status: false
        },
        error: null
    },
    signUp: {
        success: {
            email: ''
        },
        error: null
    },
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
                [action.name]: {
                    ...initialState[action.name],
                    error: action.payload
                }
                
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