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
  id,
});

export const userInfoByIdActionRequest = (id: number): interfaces.UserInfoByIdActionInterface => ({
  type: types.USER_GET_USER_INFO_BY_ID,
  id,
});

export const setMainPhotoAction = (userId: number, photoUrl: string, photoId: number): interfaces.SetMainPhotoAction => ({
  type: types.USER_SET_MAIN_PHOTO,
  userId,
  photoUrl,
  photoId,
});

export const getAvatarsAction = (id: number): interfaces.GetAvatarsActionInteface => ({
  type: types.USER_GET_AVATARS,
  payload: id,
});

export const uploadAvatarAction = (id:number, file: FormData): interfaces.UploadAvatarActionInterface => ({
  type: types.USER_UPLOAD_AVATAR,
  file,
  id,
});

export const clearDataAction = (): interfaces.ClearDataActionInterface => ({
  type: types.USER_CLEAR_DATA,
});

export const updateUserProfileAction = (payload: interfaces.UpdateUserReqbody): interfaces.UpdateUserProfileAction => ({
  type: types.UPDATE_USER_PROFILE,
  payload,
});
