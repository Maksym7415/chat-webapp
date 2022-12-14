import { createSlice } from "@reduxjs/toolkit";
import { eSideLeftConfigPage } from "../../ts/enums/app";

export const initialDialogConfig = {
  open: false,
  typeContent: "",
  title: "",
};

export const initialSelectedMessages = {
  active: false,
  messages: {},
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isLoading: false,
    sideLeftConfig: {
      page: eSideLeftConfigPage.conversations,
    },
    drawerConfig: {
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
    dialogConfig: initialDialogConfig,
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
    selectedMessages: initialSelectedMessages,
  },
  reducers: {
    setSideLeftConfigAction(state, { payload }) {
      state.sideLeftConfig = payload;
    },
    setModalConfigAction(state, { payload }) {
      state.modalConfig = payload;
    },
    setDrawerConfigAction(state, { payload }) {
      state.drawerConfig = payload;
    },
    setAllMessagesAction(state, { payload }) {
      state.allMessages = {
        ...state.allMessages,
        ...payload,
      };
    },
    setContextMenuConfigAction(state, { payload }) {
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
    setDialogConfigAction(state, { payload }) {
      state.dialogConfig = payload;
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
  setDrawerConfigAction,
  setModalConfigAction,
  setContextMenuConfigAction,
  editMessageAction,
  setLanguageAction,
  deleteMessageAction,
  shareMessageAction,
  setDialogConfigAction,
  hideDialogAction,
  setIsLoading,
  setSelectedChatsAction,
  setSelectedMessagesAction,
  setAllMessagesAction,
} = appSlice.actions;
