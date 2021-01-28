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
  messageEdit: MessageEditState
  dialogComponent: DialogComponentState
  messageFiles: Array<MessageFiles>
}

export type CommonReducerActions = PreloaderActionInterface | ShowContextMenuAction | MessageEditAction | MessageDeleteAction | DialogShowAction | DialogHideAction | MessageFilesAction | ClearMessageFilesAction;

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
}

// MESSAGE FILES
export interface MessageFiles {
  extension: string
  filePath: string
  filename: string
  mimetype: string
  originalname: string
  size: number
}

export interface MessageFilesAction {
  type: typeof types.MESSAGE_FILES
  data: Array<MessageFiles>
}

export interface ClearMessageFilesAction {
  type: typeof types.CLEAR_MESSAGE_FILES
}
