import {
  AuthActionsInterface, SignUpBody, CheckVerificationCodeBody, TokenAction, LogoutAction, LoginAction, SignUpAction, CheckVerificationCodeAction, PayloadObject,
  AuthReducerKeyType,
} from './interfaces';

import * as types from './types';
import { ErrorResponse } from '../../common/interafaces';

export const actionLogin = (login: object): LoginAction => ({
  type: types.AUTH_LOGIN,
  login,
});

export const actionSignUp = (params: SignUpBody): SignUpAction => ({
  type: types.AUTH_SIGNUP,
  params,
});

export const actionCheckVerificationCode = (params: CheckVerificationCodeBody): CheckVerificationCodeAction => ({
  type: types.AUTH_VERIFICATION_CODE,
  params,
});

export const requestSuccess = (payload: PayloadObject, name: AuthReducerKeyType): AuthActionsInterface => ({
  type: types.AUTH_SUCCESS,
  payload,
  name,
});

export const requestFail = (payload: ErrorResponse, name: AuthReducerKeyType): AuthActionsInterface => ({
  type: types.AUTH_FAIL,
  payload,
  name,
});

export const actionToken = (token: string): TokenAction => ({
  type: types.AUTH_TOKEN,
  token,
});

export const actionLogout = (): LogoutAction => ({ type: types.AUTH_LOGOUT });
