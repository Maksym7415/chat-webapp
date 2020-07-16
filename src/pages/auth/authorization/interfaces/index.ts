//temporary
export interface Login {
    success: LoginSuccess
    error: ErrorResponse
}

export interface SignUp {
    success: SignUpSuccess
    error: ErrorResponse
}

interface LoginSuccess {
    status: boolean
}

interface SignUpSuccess {
    email: string
}

interface SimpleErrorResponse {
    code: number
    message: string
}

interface ComplexErrorResponse {
    code: number
    message: string
    details: SimpleErrorResponse[]
}

export type ErrorResponse = SimpleErrorResponse | ComplexErrorResponse | null;