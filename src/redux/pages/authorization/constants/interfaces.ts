import * as types from './types';
// import { Login } from '../../../../pages/auth/interfaces';

export interface SignUpBody {
	firstName: string
	lastName: string
	login: string	
}

export interface LoginAction {
	type: typeof types.AUTH_LOGIN
	login: string
}

export interface SignUpAction {
	type: typeof types.AUTH_SIGNUP
	params: SignUpBody
}

interface AuthSuccess {
	type: typeof types.AUTH_SUCCESS
	payload: object
	name: string
}

interface AuthFail {
	type: typeof types.AUTH_FAIL
	payload: object
	name: string
}

interface Token {
	type: typeof types.AUTH_TOKEN
	token: string
}

interface Logout {
	type: typeof types.AUTH_LOGOUT
}

export type AuthActionsInterface = LoginAction | SignUpAction | AuthSuccess | AuthFail | Token | Logout