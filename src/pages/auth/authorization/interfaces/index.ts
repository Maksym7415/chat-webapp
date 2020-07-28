// temporary
export interface Login {
  success: LoginSuccess
  error: ErrorResponse
}

export interface SignUp {
  success: SignUpSuccess
  error: ErrorResponse
}

export interface Verification {
  success: Token
  error: ErrorResponse
}

interface Token {
  accessToken: string
  refreshToken: string,
}

interface SignUpSuccess {
  email: string
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

export interface State {
  login: string
}

export interface Response {
  success: {
    status: boolean
  },
  error: null | object // Record<string, unknown>
}

export type ErrorResponse = SimpleErrorResponse | ComplexErrorResponse | null;
