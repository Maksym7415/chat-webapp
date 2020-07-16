import { Login, SignUp } from '../../../../pages/auth/authorization/interfaces';

interface Token {
    accessToken: string
    payload: object
}

export interface AuthReducerInterface {
    login: Login
    signUp: SignUp
    token: Token | null
}