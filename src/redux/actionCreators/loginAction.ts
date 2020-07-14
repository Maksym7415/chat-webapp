import { tokenData, IloginData } from '../actionTypes/constantsActionTypes';
import * as actionsTypes from '../actionTypes/loginActionTypes'
export const loginRequest = (data: IloginData): actionsTypes.LoginRequest => ({
    type: actionsTypes.LOGIN_REQUEST,
    payload: data
})

export const loginSuccessAction = (tokens: tokenData): actionsTypes.LoginSuccessAction => ({
    type: actionsTypes.LOGIN_SUCCESS,
    payload: tokens
})

export const loginFailureAction = (error: Error | string): actionsTypes.LoginFailureAction => ({
    type: actionsTypes.LOGIN_FAILURE,
    error
})


