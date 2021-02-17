import * as types from './types';
import * as interfaces from './interafaces';

export const preloaderAction = (isShow: boolean): interfaces.CommonReducerActions => ({
  type: types.APP_PRELOADER,
  payload: isShow,
});

export const contextMenuAction = (payload: interfaces.ContextMenuState): interfaces.CommonReducerActions => ({
  type: types.SHOW_CONTEXT_MENU,
  payload,
});

export const editMessageAction = (isEdit: boolean, messageId: number | null): interfaces.CommonReducerActions => ({
  type: types.IS_EDIT_MESSAGE,
  payload: { isEdit, messageId },
});

export const deleteMessageAction = (isDelete: boolean, messageId: number | null): interfaces.CommonReducerActions => ({
  type: types.IS_EDIT_MESSAGE,
  payload: { isDelete, messageId },
});

export const showDialogAction = (title: string, id: number): interfaces.CommonReducerActions => ({
  type: types.DIALOG_COMPONENT_SHOW,
  payload: {
    isShow: true,
    title,
    id,
  },
});

export const hideDialogAction = (): interfaces.CommonReducerActions => ({
  type: types.DIALOG_COMPONENT_HIDDEN,
});

export const setMessageFilesAction = (data: Array<interfaces.MessageFiles>): interfaces.MessageFilesAction => ({
  type: types.MESSAGE_FILES,
  data,
});

export const showChatInfoPanel = (data: boolean): interfaces.ShowChatInfoPanelAction => ({
  type: types.SHOW_CHAT_INFO_PANEL,
  data,
});

export const clearMessageFilesAction = (): interfaces.ClearMessageFilesAction => ({
  type: types.CLEAR_MESSAGE_FILES,
});
