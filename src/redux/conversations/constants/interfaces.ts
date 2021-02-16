import { conversationActionFail } from './actionConstants';
/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ErrorResponse } from '../../common/interafaces';

// COMMON INTERFACES

interface Pagination {
  allItems: number
  currentPage: number
}

interface ConversationActionSuccess {
  type: typeof types.CONVERSATION_SUCCESS
  payload: ConversationReducerPayload,
  name: ConversationReducerStateType
}

interface ConversationActionFail {
  type: typeof types.CONVERSATION_FAIL
  payload: ErrorResponse,
  name: ConversationReducerStateType
}

interface PayloadArrayPagination {
  data: []
  pagination: Pagination
}

interface PayloadArray {
  data: []
}

interface PayloadObject {
  data: {}
}

export interface ConversationReducerStateInterface {
  userHistoryConversation: UserHistoryConversation
  conversationsList: UserConversationsList
  conversations: Conversations
  currentChat: CurrentChat
  lastMessages: LastMessagesStateKey
  editedMessage: Messages | null
  deleteMessageId: {
    id: number | null
  }
  currentConversationIdObject: {
    currentConversationId: number
    conversationInfo:any
  }
  conversationId: {
    id: number
    type: string
  }
  conversationTypeState: ConverstaionTypeStateForReducer
  createConversation: UserCreateConversation
  opponentId: {
    id: number
    name: string
  }
  conversationInfo: ConversationInfoData
}

export type ConversationReducerPayload = PayloadArrayPagination | PayloadArray | PayloadObject;

export type ConversationReducerStateType = keyof ConversationReducerStateInterface;

export type ConversationActionsType = ConversationActionSuccess | ConversationActionFail | UserConversationHistoryActionRequest | ConversationAddNewMessageAction | ConversationIdAction | ConversationTypeStateInterfaceAction | CreateNewChatActionInterface | ClearConversationInterface | ConversationEditMessageAction | ConversationDeleteMessage;

// USER_CONVERSATION_HISTORY INTERFACES

interface UserHistoryConversation {
  success: UserHistoryConversationSuccess
  error: ErrorResponse
}

interface User {
  firstName: string
  fullName: string
  id: number
  lastName: string
  status: string
  tagName: string
  userAvatar: string
}

export interface FileData {
  extension: string
  fileStorageName: string
  fileUserName: string
  fkMessageId: number
  id: number
  size: number
}

export interface Messages {
  User: User
  message: string
  fkSenderId: number
  id: number
  sendDate: string
  messageType?: string
  Files: Array<FileData>
  isEditing?: boolean
  component: object
}

export interface UserConversationHistoryActionRequest {
  type: typeof types.CONVERSATION_USER_HISTORY_CONVERSATION
  id: number
  offset: number
}

export interface UserHistoryConversationSuccess {
  data: Array<Messages>
  pagination: Pagination
}

// USER_CONVERSATIONS INTERFACES

interface UserConversationsList {
  success: UserConversationsListSuccess
  error: ErrorResponse
}

interface ConverstaionTypeStateForReducer {
  isTyping: boolean
  user: Users
  conversationId: number
}

interface ConverstaionTypeState {
  isTyping: boolean
  conversationId: number
  user: Users
}

export interface Users {
  isTyping: boolean
  firstName: string
  userId: number

}

export interface ConversationTypeStateInterfaceAction {
  type: typeof types.CONVERSATION_TYPE_STATE
  payload: ConverstaionTypeState

}

export interface ConversationsList {
  messageId: number
  fkSenderId: number
  Messages: Array<Messages>
  message: string
  messageType: string
  sendDate: string
  conversationId: number
  conversationAvatar: string
  conversationType: string
  conversationName: string
  conversationCreationDate: string
}

export interface UserConversationsListSuccess {
  data: Array<ConversationsList>
}

export interface UserConversationsListActionRequest {
  type: typeof types.CONVERSATIONS_USER_CONVERSATIONS
}

// LAST CONVERSATION MESSAGE

interface LastMessagesStateKey {
  [id: string]: Messages
}

export interface LastConversationMessageAction {
  type: typeof types.GET_LAST_CONVERSATION_MESSAGE
  data: PayloadObject
}

export interface Conversations {
  message: string
  id: number
  sendDate: string
}

export interface ConversationAddNewMessageAction {
  type: typeof types.CONVERSATIONS_ADD_NEW_MESSAGE
  message: Messages
  id: number
  conversationInfo:any
}

// EDITED MESSAGE
export interface ConversationEditMessageAction {
  type: typeof types.CONVERSATIONS_EDIT_MESSAGE
  message: Messages
}

// DELETE MESSAGE
export interface ConversationDeleteMessage {
  type: typeof types.CONVERSATIONS_DELETE_MESSAGE
  id: number
}

// CURRENT CHAT
interface CurrentChat {
  id: number
}

export interface ConversationIdAction {
  type: typeof types.CONVERSATION_ID
  payload: {
    id: number,
    type: string
  }
}

// CREATE NEW CONVERSATION

interface ResponseCreateConversation {
  id: number
}
interface UserCreateConversationSuccess {
  data: Array<ResponseCreateConversation>
}

interface UserCreateConversation {
  success: UserCreateConversationSuccess
  error: ErrorResponse
}

export interface IdsInterface {
  opponentId: number
  userId: number
  name: string
}
export interface CreateNewChatActionInterface {
  type: typeof types.CONVERSATION_CREATE_NEW_CONVERSATION
  payload: IdsInterface
}

// CLEAR INTERFACES

export interface ClearConversationInterface {
  type: typeof types.CONVERSATION_CLEAR_DATA
}

interface CInfo {
  id: number,
  type: string
}

interface ConversationInfoData {
  success: {
    Users: Array<CUser>
    conversationAvatar: null | string
    conversationCreationDate: string
    conversationName: string
    conversationType:string
    conversationUpdateDate: null
    id: number
  }
  error: ErrorResponse

}

interface CUser {
  firstName: string
  userUpdateTime: null | string
  activityStatus: string
  id: number
}

export interface ConversationInfo {
  type: typeof types.CONVERSATION_INFO,
  payload: CInfo
}
