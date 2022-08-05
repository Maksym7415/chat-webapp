/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/no-cycle */
import * as types from './types';
import { Messages } from '../conversations/constants/interfaces';

interface SimpleErrorResponse {
  code: number
  message: string
}

interface ComplexErrorResponse {
  code: number
  message: string
  details: SimpleErrorResponse[]
}

interface ShareMessageActionInterface {
  type: typeof types.SHARE_MESSAGES
  payload: Array<Messages> | []
}

interface PreloaderActionInterface {
  type: typeof types.APP_PRELOADER
  payload: boolean
}

export type ErrorResponse = SimpleErrorResponse | ComplexErrorResponse | null;

export interface CommonReducerInterface {
  preloader: boolean
  contextMenu: ContextMenuState
  messageEdit: MessageEditState
  dialogComponent: DialogComponentState
  sheraMessages: Array<Messages> | []
}

export type CommonReducerActions = PreloaderActionInterface
| ShowContextMenuAction
| MessageEditAction
| MessageDeleteAction
| DialogShowAction
| DialogHideAction
| ShareMessageActionInterface;

// CONTEXT MENU
export interface ContextMenuConfig {
  id: number
  title: string
  callback: Function
}

export interface ContextMenuState {
  yPos: string
  xPos: string
  isShowMenu: boolean
  messageId: number
  config: Array<ContextMenuConfig>
}

interface ShowContextMenuAction {
  type: typeof types.SHOW_CONTEXT_MENU
  payload: ContextMenuState
}

// MESSAGE EDIT
interface MessageEditAction {
  type: typeof types.IS_EDIT_MESSAGE
  payload: MessageEditState
}

interface MessageDeleteAction {
  type: typeof types.IS_DELETE_MESSAGE
  payload: MessageEditState
}

export interface MessageEditState {
  isEdit?: boolean
  isDelete?: boolean
  messageId: number | null
}

// DIALOG COMPONENT
interface DialogShowAction {
  type: typeof types.DIALOG_COMPONENT_SHOW
  payload: DialogComponentState
}

interface DialogHideAction {
  type: typeof types.DIALOG_COMPONENT_HIDDEN
}

export interface DialogComponentState {
  isShow: boolean
  title: string
  data?: any,
}
