import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authTokenAction,
  setLoginSingInAction,
  setAuthHedersAction,
  setIsLogoutAction,
} from "./slice";
import API from "../../config/axios";
import { pathBackAuth } from "../../config/constants/urlBack";
import { setTokenLS } from "../../config/localStorage";

export const postLoginRequest = createAsyncThunk(
  "auth/postLoginRequest",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.signIn, {
        ...params.data,
      });
      dispatch(setLoginSingInAction(params.data.login));
      params.cb && params.cb(response.data.verificationCode);
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb(error?.data);
      return Promise.reject(error);
    }
  }
);

export const postVerificationRequest = createAsyncThunk(
  "auth/postVerificationRequest",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.checkVerificationCode, {
        ...params.data,
      });

      await dispatch(
        authTokenAction({
          token: response.data.accessToken,
        })
      );

      setTokenLS(response.data.accessToken);

      await dispatch(setAuthHedersAction(response.data));
      dispatch(setIsLogoutAction(false));
      params.cb && params.cb();
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb(error?.data);
      return Promise.reject(error);
    }
  }
);

export const postSingUpRequest = createAsyncThunk(
  "auth/postSingUpRequest",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.signUp, {
        ...params.data,
      });
      dispatch(
        postLoginRequest({
          data: {
            login: params.data.login,
          },
          cb: params.cb(),
        })
      );
      return response.data;
    } catch (error) {
      params.errorCb && params.errorCb(error?.data);
      return Promise.reject(error);
    }
  }
);
