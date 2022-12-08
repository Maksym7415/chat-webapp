import { createSlice } from "@reduxjs/toolkit";
import * as requests from "./requests";

const initialState = {
  conversationMessages: {
    data: [],
    pagination: {
      allItems: 0,
      currentPage: 0,
    },
  },
  userHistoryConversations: {
    // [0]: {
    //   pagination: {
    //     allItems: 0,
    //     currentPage: 0,
    //   },
    // },
  },
  conversationsList: {
    data: {},
  },
  conversationTypeState: {
    0: {
      isTyping: false,
      userId: 0,
      users: [
        {
          isTyping: false,
          firstName: "",
          userId: 0,
        },
      ],
    },
  },
};

const conversationsSlice = createSlice({
  name: "conversationsSlice",
  initialState,
  reducers: {
    updateConversationTypeStateAction(state, { payload }) {
      state.conversationTypeState = {
        ...state.conversationTypeState,
        [payload.conversationId]: payload.data,
      };
    },
    updateConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...state.conversationsList.data,
        ...payload,
      };
    },
    setConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...payload,
      };
    },
    updateUserHistoryConversation(state, { payload }) {
      state.userHistoryConversations = {
        ...state.userHistoryConversations,
        [payload.conversationId]: {
          ...state.userHistoryConversations?.[payload.conversationId],
          ...payload.data,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      requests.getUserConversationsRequest.fulfilled,
      (state, action) => {
        state.conversationsList.data = action.payload.data;
      }
    );
    // builder.addCase(
    //   requests.getUserConversationsRequest.rejected,
    //   (state, action) => {
    //     state.login = {
    //       ...initialState[state.login],
    //       error: action.payload,
    //     };
    //   },
    // );
    builder.addCase(
      requests.getConversationMessagesRequest.fulfilled,
      (state, action) => {
        state.conversationMessages = {
          data: action.payload?.data,
          pagination: action.payload?.pagination,
        };
      }
    );
  },
});

export const {
  updateConversationTypeStateAction,
  updateConversationListAction,
  updateUserHistoryConversation,
  setConversationListAction,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
