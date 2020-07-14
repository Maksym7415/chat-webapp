import { authActions, SignUpBody } from './interfaces';
import * as types from './types';

export const actionLogin = (login: string): authActions => ({
    type: types.LOGIN,
    login
});

export const actionSignUp = (params: SignUpBody): authActions => ({
    type: types.SIGNUP,
    params
});

export const requestSuccess = (payload: object, name: string): authActions => ({
    type: types.AUTH_SUCCESS,
    payload,
    name
})

export const requestFail = (payload: object, name: string): authActions => ({
    type: types.AUTH_FAIL,
    payload,
    name
})
