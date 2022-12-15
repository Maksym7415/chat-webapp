import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";
import { pathBackSearch } from "../../config/constants/urlBack";
import { setLoadingSearchContacts } from "./slice";

export const getSearchContactRequest = createAsyncThunk(
  "search/getSearchContactRequest",
  async (options: any, { dispatch }) => {
    dispatch(setLoadingSearchContacts(true));
    const params: any = {};

    if (options?.params?.search) {
      params.searchRequest = options?.params?.search;
    }
    if (options?.params?.offset) {
      params.offset = options?.params?.offset;
    }

    try {
      const response = await API.get(pathBackSearch.searchContact, {
        params,
      });

      options?.cb && options.cb();

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      dispatch(setLoadingSearchContacts(false));
    }
  }
);

export const getOpponentsIdWhereConversTypeDialogRequest = createAsyncThunk(
  "search/getOpponentsIdWhereConversTypeDialogRequest",
  async (options: any) => {
    try {
      const response = await API.get(
        pathBackSearch.getOpponentsIdWhereConversTypeDialog,
        {
          params: options?.params,
        }
      );

      options?.cb && options.cb(response.data);

      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
