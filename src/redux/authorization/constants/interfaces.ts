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
  tokenPayload: TokenPayload
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
  error: ErrorResponse | any
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
  error: ErrorResponse | any
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
  error: ErrorResponse | any
}

// TOKENS INTERFACES

interface Tokens {
  accessToken: string
  refreshToken: string,
}

export interface TokenPayload {
  role: string
  login: string
  userAgent: string
  userId: number
  firstName: string
  type: string
  iat: number
  exp: number
}

export interface TokenAction {
  type: typeof types.AUTH_TOKEN
  token: string
}

// LOGOUT INTERFACES

export interface LogoutAction {
  type: typeof types.AUTH_LOGOUT
}
