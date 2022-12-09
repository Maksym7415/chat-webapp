import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authTokenAction,
  setLoginSingInAction,
  setAuthHeadersAction,
  setIsLogoutAction,
} from "./slice";
import API from "../../config/axios";
import { pathBackAuth } from "../../config/constants/urlBack";
import { setTokenLS } from "../../config/localStorage";

export const postLoginRequest = createAsyncThunk(
  "auth/postLoginRequest",
  async (options: any, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.signIn, {
        ...options.data,
      });
      dispatch(setLoginSingInAction(options.data.login));
      options.cb && options.cb(response.data.verificationCode);
      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);
      return Promise.reject(error);
    }
  }
);

export const postVerificationRequest = createAsyncThunk(
  "auth/postVerificationRequest",
  async (options: any, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.checkVerificationCode, {
        ...options.data,
      });

      setTokenLS(response.data.accessToken);

      await dispatch(setAuthHeadersAction(response.data));

      await dispatch(
        authTokenAction({
          token: response.data.accessToken,
        })
      );

      dispatch(setIsLogoutAction(false));

      options.cb && options.cb();
      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);
      return Promise.reject(error);
    }
  }
);

export const postSingUpRequest = createAsyncThunk(
  "auth/postSingUpRequest",
  async (options: any, { dispatch }) => {
    try {
      const response = await API.post(pathBackAuth.signUp, {
        ...options.data,
      });
      dispatch(
        postLoginRequest({
          data: {
            login: options.data.login,
          },
          cb: options.cb(),
        })
      );
      return response.data;
    } catch (error) {
      options.errorCb && options.errorCb(error?.data);
      return Promise.reject(error);
    }
  }
);
