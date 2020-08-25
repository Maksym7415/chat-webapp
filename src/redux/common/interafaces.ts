import * as types from './types';

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

export interface PreloaderActionInterface {
  type: typeof types.APP_PRELOADER
  payload: boolean
}

export interface CommonReducerInterface {
  isShow: boolean
}
