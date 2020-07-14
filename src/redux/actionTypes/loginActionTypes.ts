import { IloginData, tokenData } from './constantsActionTypes';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export interface LoginRequest {
    type: typeof LOGIN_REQUEST,
    payload: IloginData
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS,
    payload: tokenData,
}

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export interface LoginFailureAction {
    type: typeof LOGIN_FAILURE,
    error: Error | string,
}

export type LoginActionsType =
    | LoginRequest
    | LoginSuccessAction
    | LoginFailureAction
