import { AuthActionsInterface, SignUpBody } from './interfaces';
import * as types from './types';

export const actionLogin = (login: string): AuthActionsInterface => ({
    type: types.AUTH_LOGIN,
    login
});

export const actionSignUp = (params: SignUpBody): AuthActionsInterface => ({
    type: types.AUTH_SIGNUP,
    params
});

export const requestSuccess = (payload: object, name: string): AuthActionsInterface => ({
    type: types.AUTH_SUCCESS,
    payload,
    name
});

export const requestFail = (payload: object, name: string): AuthActionsInterface => ({
    type: types.AUTH_FAIL,
    payload,
    name
});

export const actionToken = (token: string): AuthActionsInterface => ({
    type: types.AUTH_TOKEN,
    token
});

export const actionLogout = (): AuthActionsInterface => ({ type: types.AUTH_LOGOUT });

