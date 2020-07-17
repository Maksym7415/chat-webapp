import { AuthActionsInterface, SignUpBody, CheckVerificationCode, CheckVerificationCodeBody } from './interfaces';
import { AuthReducerKeyType } from '../reducer/types';
import * as types from './types';

export const actionLogin = (login: object): AuthActionsInterface => ({
    type: types.AUTH_LOGIN,
    login
});

export const actionSignUp = (params: SignUpBody): AuthActionsInterface => ({
    type: types.AUTH_SIGNUP,
    params
});

export const actionCheckVerificationCode = (params: CheckVerificationCodeBody) => ({
    type: types.AUTH_VERIFICATION_CODE,
    params
})

export const requestSuccess = (payload: object, name: AuthReducerKeyType): AuthActionsInterface => ({
    type: types.AUTH_SUCCESS,
    payload,
    name
});

export const requestFail = (payload: object, name: AuthReducerKeyType): AuthActionsInterface => ({
    type: types.AUTH_FAIL,
    payload,
    name,
});

export const actionToken = (token: string): AuthActionsInterface => ({
    type: types.AUTH_TOKEN,
    token
});

export const actionLogout = (): AuthActionsInterface => ({ type: types.AUTH_LOGOUT });

