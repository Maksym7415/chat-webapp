interface Token {
    accessToken: string
    payload: object
}

export interface AuthReducerInterface {
    login: object | null
    signUp: object | null
    token: Token | null
}