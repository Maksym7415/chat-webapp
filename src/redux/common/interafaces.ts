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
