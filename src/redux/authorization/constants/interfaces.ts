import * as types from './types';

export interface SignUpBody {
	firstName: string
	lastName: string
	login: string	
}

export interface LoginAction {
	type: typeof types.LOGIN
	login: string
}

interface SignUpAction {
	type: typeof types.SIGNUP
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

export type authActions = LoginAction | SignUpAction | AuthSuccess | AuthFail