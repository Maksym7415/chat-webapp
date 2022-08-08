import * as types from './types';
import * as interfaces from './interafaces';
import { Messages } from '../conversations/constants/interfaces';

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

export const setLanguageAction = (lang: string): interfaces.CommonReducerActions => ({
  type: types.SET_LANGUAGE,
  payload: lang,
});

export const deleteMessageAction = (isDelete: boolean, messageId: number | null): interfaces.CommonReducerActions => ({
  type: types.IS_EDIT_MESSAGE,
  payload: { isDelete, messageId },
});

export const shareMessageAction = (messages: Array<Messages> | []): interfaces.CommonReducerActions => ({
  type: types.SHARE_MESSAGES,
  payload: messages,
});

export const showDialogAction = (title: string, data?: any): interfaces.CommonReducerActions => ({
  type: types.DIALOG_COMPONENT_SHOW,
  payload: {
    isShow: true,
    title,
    data,
  },
});

export const hideDialogAction = (): interfaces.CommonReducerActions => ({
  type: types.DIALOG_COMPONENT_HIDDEN,
});
