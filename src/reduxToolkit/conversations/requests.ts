import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../config/axios";
import { pathBackConversations } from "../../config/constants/urlBack";
import {
  updateUserHistoryConversation,
  setConversationListAction,
} from "./slice";

export const getUserConversationsRequest = createAsyncThunk(
  "conversationsSlice/getUserConversationsRequest",
  async (_, { dispatch }) => {
    try {
      const response = await API.get(
        pathBackConversations.getUserConversations
      );
      const data = response.data.data.reduce((acc, item) => {
        acc[item.conversationId] = item;
        return acc;
      }, {});
      dispatch(setConversationListAction(data));
    } catch (error) {
      console.log(error, "error");

      return Promise.reject(error);
    }
  }
);

export const getConversationMessagesRequest = createAsyncThunk(
  "conversationsSlice/getConversationMessagesRequest",
  async (params: any, { dispatch }) => {
    try {
      const response = await API.get(
        `${pathBackConversations.conversationHistory}/${params.data.id}?offset=${params.data.offset}`
      );
      params?.cb && params.cb(response.data);

      dispatch(
        updateUserHistoryConversation({
          conversationId: params.data.id,
          data: { pagination: response.data.pagination },
        })
      );

      return { data: response.data.data, pagination: response.data.pagination };
    } catch (error) {
      console.log(error, "error");
      params?.errorCb && params.errorCb(error.data);
      return Promise.reject(error);
    }
  }
);
