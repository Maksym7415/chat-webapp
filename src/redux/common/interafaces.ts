import * as types from './types';

interface SimpleErrorResponse {
  code: number
  message: string
}

interface ComplexErrorResponse {
  code: number
  message: string
  details: SimpleErrorResponse[]
}

interface PreloaderActionInterface {
  type: typeof types.APP_PRELOADER
  payload: boolean
}

export type ErrorResponse = SimpleErrorResponse | ComplexErrorResponse | null;

export interface CommonReducerInterface {
  preloader: boolean
  contextMenu: ContextMenuState
}

export type CommonReducerActions = PreloaderActionInterface | ShowContextMenuAction;

// CONTEXT MENU
export interface ContextMenuState {
  yPos: string
  xPos: string
  isShowMenu: boolean
  messageId: number
  component: Function | null
}

interface ShowContextMenuAction {
  type: typeof types.SHOW_CONTEXT_MENU
  payload: ContextMenuState
}
