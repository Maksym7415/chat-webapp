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
  setMainPhoto: MainPhotoInteface
  avatars: GetAvatarsInteface
  upload: UploadAvatarReducerInterface
}

export interface PayloadObject {
  data: UserInfoSuccess
}

export type UserReducerKeyType = keyof UserReducerInterface;

export type UserActionsInterface = UserSuccess | ClearDataActionInterface | UserFail;

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
  userAvatar: string
  userCreationTime: string
  userUpdateTime: string
  userLastTimeOnline: string
  Roles: Array<Roles>
}

interface Roles {
  id: number
  name: string
  description: string
}

export interface UpdateUserReqbody {
  firstName?: string
  tagName?: string
  lastName?: string
}

export interface UpdateUserProfileAction {
  type: typeof types.UPDATE_USER_PROFILE
  payload: UpdateUserReqbody
}

export interface UserInfoActionInterface {
  type: typeof types.USER_GET_USER_INFO
  id: number
}

export type UserInfoSuccessKeyType = keyof UserInfoSuccess;

export interface UserInfoSuccess1KeyType {
  [key: string]: string
}

// SET MAIN PHOTO

interface MainPhotoInteface {
  success: {
    data: string
  }
  error: ErrorResponse
}

export interface SetMainPhotoAction {
  type: typeof types.USER_SET_MAIN_PHOTO,
  userId: number
  photoUrl: string
  photoId: number
}

// GET AVATARS

interface GetAvatarsInteface {
  success: {
    data: Array<AvatarObject>
  }
  error: ErrorResponse
}

interface AvatarObject {
  id: number,
  fileName: string,
  defaultAvatar: boolean,
  fkUserId: number
}

export interface GetAvatarsActionInteface {
  type: typeof types.USER_GET_AVATARS
}

// UPLOAD PHOTO

interface UploadAvatarReducerInterface {
  success: {
    data: string
  }
  error: ErrorResponse
}

export interface UploadAvatarActionInterface {
  type: typeof types.USER_UPLOAD_AVATAR
  file: FormData
}

// CLEAR DATA

export interface ClearDataActionInterface {
  type: typeof types.USER_CLEAR_DATA
}
