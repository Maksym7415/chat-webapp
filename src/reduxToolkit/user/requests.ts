import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";
import { pathBackUser } from "../../config/constants/urlBack";

export const getUserProfileDataRequest = createAsyncThunk(
  "user/getUserProfileDataRequest",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.get(pathBackUser.getUserProfileData);
      params?.cb && params.cb();
      return response.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  }
);

export const getUserAvatars = createAsyncThunk(
  "user/getUserAvatars",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.get(pathBackUser.getAvatars);
      params?.cb && params.cb();
      return response.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  }
);

export const putUpdateProfileRequest = createAsyncThunk(
  "user/putUpdateProfileRequest",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.put(pathBackUser.updateProfile, {
        ...params.data,
      });
      params?.cb && params.cb(response.data);
      return response.data;
    } catch (error) {
      params?.errorCb && params.errorCb();
      return Promise.reject(error);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (options: any, { dispatch }) => {
    try {
      const response = await API.delete(
        `${pathBackUser.deleteAvatar}/${options.params.id}`
      );
      console.log(response, "response");
      options?.cb && options.cb(response.data);
      return response.data;
    } catch (error) {
      options?.errorCb && options.errorCb();
      return Promise.reject(error);
    }
  }
);
