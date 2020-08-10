import * as interfaces from './interfaces';
import * as types from './types';
import { ErrorResponse } from '../../common/interafaces';

export const userActionSuccess = (payload: interfaces.PayloadObject, name: interfaces.UserReducerKeyType): interfaces.UserActionsInterface => ({
    type: types.USER_SUCCESS,
    payload,
    name,
});
  
export const userActionFail = (payload: ErrorResponse, name: interfaces.UserReducerKeyType): interfaces.UserActionsInterface => ({
    type: types.USER_FAIL,
    payload,
    name,
});

export const userInfoActionRequest = (id: number): interfaces.UserInfoActionInterface => ({
    type: types.USER_GET_USER_INFO,
    id
});