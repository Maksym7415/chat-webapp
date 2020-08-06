/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ErrorResponse } from '../../common/interafaces';

// COMMON INTERFACES

interface AuthSuccess {
  type: typeof types.AUTH_SUCCESS
  payload: PayloadObject
  name: AuthReducerKeyType
}

interface AuthFail {
  type: typeof types.AUTH_FAIL
  payload: ErrorResponse
  name: AuthReducerKeyType;
}

export interface PayloadObject {
  data: object
}

export interface AuthReducerInterface {
  login: Login
  signUp: SignUp
  tokenPayload: object
  logout: {
    isLogout: boolean
  }
  verification: Verification
}

export type AuthReducerKeyType = keyof AuthReducerInterface;

export type AuthActionsInterface = AuthSuccess | AuthFail | TokenAction | LogoutAction;

// SIGN_UP INTERFACES

interface SignUpSuccess {
  email: string
}

export interface SignUpBody {
  firstName: string
  lastName: string
  login: string
}

export interface SignUp {
  success: SignUpSuccess
  error: ErrorResponse
}

export interface SignUpAction {
  type: typeof types.AUTH_SIGNUP
  params: SignUpBody
}

// SIGN_IN INTERFACES

interface LoginSuccess {
  status: boolean
}

export interface LoginAction {
  type: typeof types.AUTH_LOGIN
  login: object
}

export interface Login {
  success: LoginSuccess
  error: ErrorResponse
}

// VERIFICATION INTERFACES

export interface CheckVerificationCodeBody {
  verificationCode: string
  login: string
}

export interface CheckVerificationCodeAction {
  type: typeof types.AUTH_VERIFICATION_CODE
  params: CheckVerificationCodeBody
}

export interface Verification {
  success: Tokens
  error: ErrorResponse
}

// TOKENS INTERFACES

interface Tokens {
  accessToken: string
  refreshToken: string,
}

export interface TokenAction {
  type: typeof types.AUTH_TOKEN
  token: string
}

// LOGOUT INTERFACES

export interface LogoutAction {
  type: typeof types.AUTH_LOGOUT
}
