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

export const setMainPhotoAction = (userId: number, photoUrl: string, photoId: number): interfaces.SetMainPhotoAction => ({
  type: types.USER_SET_MAIN_PHOTO,
  userId,
  photoUrl,
  photoId,
});

export const getAvatarsAction = (): interfaces.GetAvatarsActionInteface => ({
  type: types.USER_GET_AVATARS,
});

export const uploadAvatarAction = (file: FormData): interfaces.UploadAvatarActionInterface => ({
  type: types.USER_UPLOAD_AVATAR,
  file,
});

export const clearDataAction = (): interfaces.ClearDataActionInterface => ({
  type: types.USER_CLEAR_DATA,
});
