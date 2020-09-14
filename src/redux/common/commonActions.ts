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
  payload: { isEdit, isDelete: false, messageId },
});
