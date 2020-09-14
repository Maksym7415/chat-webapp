import * as types from './types';
import * as interafaces from './interafaces';

export const preloaderAction = (isShow: boolean): interafaces.CommonReducerActions => ({
  type: types.APP_PRELOADER,
  payload: isShow,
});

export const contextMenuAction = (payload: interafaces.ContextMenuState): interafaces.CommonReducerActions => ({
  type: types.SHOW_CONTEXT_MENU,
  payload,
});
