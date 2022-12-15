import { createSlice } from "@reduxjs/toolkit";
import { eSideLeftConfigPage } from "../../ts/enums/app";

export const initialState = {
  isLoading: false,
  sideLeftConfig: {
    page: eSideLeftConfigPage.conversations,
  },
  allMessages: {},
  messageEdit: {
    message: {},
    messageId: null,
  },
  forwardMessages: [],
  selectedChats: {},
  selectedMessages: {
    active: false,
    messages: {},
  },
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setSideLeftConfigAction(state, { payload }) {
      state.sideLeftConfig = payload;
    },
    setAllMessagesAction(state, { payload }) {
      state.allMessages = {
        ...state.allMessages,
        ...payload,
      };
    },
    editMessageAction(state, { payload }) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    setLanguageAction(state, { payload }) {
      state.lang = payload;
    },
    deleteMessageAction(state, { payload }) {
      state.messageEdit = {
        ...state.messageEdit,
        ...payload,
      };
    },
    shareMessageAction(state, { payload }) {
      state.forwardMessages = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setSelectedChatsAction(state, { payload }) {
      state.selectedChats = payload;
    },
    setSelectedMessagesAction(state, { payload }) {
      state.selectedMessages = payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setSideLeftConfigAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  setIsLoading,
  setSelectedChatsAction,
  setSelectedMessagesAction,
  setAllMessagesAction,
} = appSlice.actions;
