import { createSlice } from "@reduxjs/toolkit";
import { themeLight } from "../../config/theme";

import { eSideLeftConfigPage } from "../../ts/enums/app";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isLoading: false,
    sideLeftConfig: {
      page: eSideLeftConfigPage.conversationList,
    },
    drawerState: {
      anchor: "left",
      open: false,
      type: "",
      width: 300,
      configContent: {
        typeProfile: "",
        conversationData: {},
      },
    },
    modalConfig: {
      open: false,
      renderContent: "settingProfile",
      styles: {
        container: {},
      },
    },
    allMessages: {},
    contextMenuConfig: {
      event: null,
      isShowMenu: false,
      messageId: 0,
      config: [],
      callBackItem: () => {},
    },
    messageEdit: {
      message: {},
      messageId: null,
    },
    dialogComponent: {
      isShow: false,
      title: "",
    },
    sheraMessages: [],
    selectedСhats: {},
    selectedMessages: {},
  },
  reducers: {
    setSideLeftConfigAction(state, { payload }) {
      state.sideLeftConfig = payload;
    },
    setModalConfigAction(state, { payload }) {
      state.modalConfig = payload;
    },
    setDrawerStateAction(state, { payload }) {
      state.drawerState = payload;
    },
    setAllMessagesAction(state, { payload }) {
      state.allMessages = {
        ...state.allMessages,
        ...payload,
      };
    },
    setContextMenuConfigAction(state, { payload }) {
      console.log(payload, "setContextMenuConfigAction");
      state.contextMenuConfig = payload;
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
      state.sheraMessages = payload;
    },
    showDialogAction(state, { payload }) {
      state.dialogComponent = payload;
    },
    hideDialogAction(state, { payload }) {
      state.dialogComponent = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setSelectedChatsAction(state, { payload }) {
      state.selectedСhats = payload;
    },
    setSelectedMessagesAction(state, { payload }) {
      state.selectedMessages = payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setSideLeftConfigAction,
  setDrawerStateAction,
  setModalConfigAction,
  setContextMenuConfigAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  showDialogAction,
  hideDialogAction,
  setIsLoading,
  setSelectedChatsAction,
  setSelectedMessagesAction,
  setAllMessagesAction,
} = appSlice.actions;
