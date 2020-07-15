import { Login } from '../../../../pages/auth/interfaces';

interface Token {
    accessToken: string
    payload: object
}

export interface AuthReducerInterface {
    login: Login   
    signUp: object | null
    token: Token | null
}