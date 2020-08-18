/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ErrorResponse } from '../../common/interafaces';

// COMMON INTERFACES

interface UserSuccess {
    type: typeof types.USER_SUCCESS
    payload: PayloadObject
    name: UserReducerKeyType
}
  
  interface UserFail {
    type: typeof types.USER_FAIL
    payload: ErrorResponse
    name: UserReducerKeyType;
}

export interface UserReducerInterface {
    userInfo: UserInfo
}

export interface PayloadObject {
    data: UserInfoSuccess
}
  
export type UserReducerKeyType = keyof UserReducerInterface;

export type UserActionsInterface = UserSuccess | UserFail;

// USER INFO INTERFACES

interface UserInfo {
    success: {
        data: UserInfoSuccess
    }
    error: ErrorResponse
}

interface UserInfoSuccess {
    id: number
    login: string
    firstName: string
    lastName: string
    tagName: string
    fullName: string
    status: string
    userCreationTime: string
    userUpdateTime: string
    userLastTimeOnline: string
    roles: Array<Roles>
}

interface Roles {
    id: number
    name: string
    description: string
}

export interface UserInfoActionInterface {
    type: typeof types.USER_GET_USER_INFO
    id: number
}

export type UserInfoSuccessKeyType = keyof UserInfoSuccess;

export interface UserInfoSuccess1KeyType {
    [key: string]: string
}