import * as types from './types';

export interface SignUpBody {
	firstName: string
	lastName: string
	login: string	
}

interface LoginAction {
	type: typeof types.LOGIN
	params: string
}

interface SignUpAction {
	type: typeof types.SIGNUP
	params: SignUpBody
}

interface AuthSuccess {
	type: typeof types.AUTH_SUCCESS
	payload: number
	name: string
}

interface AuthFail {
	type: typeof types.AUTH_FAIL
	payload: object
	name: string
}

export type authActions = LoginAction | SignUpAction | AuthSuccess | AuthFail