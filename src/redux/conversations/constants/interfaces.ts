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
  currentConversationIdObject: {
    currentConversationId: number
  }
  conversationId: {
    id: number
  }
  conversationTypeState: {
    [key: number]: ConverstaionTypeStateForReducer
  }
  createConversation: UserCreateConversation
  opponentId: {
    id: number
  }
}

export type ConversationReducerPayload = PayloadArrayPagination | PayloadArray | PayloadObject;

export type ConversationReducerStateType = keyof ConversationReducerStateInterface;

export type ConversationActionsType = ConversationActionSuccess | ConversationActionFail | UserConversationHistoryActionRequest | ConversationAddNewMessageAction | ConversationIdAction | ConversationTypeStateInterfaceAction | CreateNewChatActionInterface | ClearConversationInterface;

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
  users: Array<Users>
  userId: number
}

interface ConverstaionTypeState {
  isTyping: boolean
  conversationId: number
  users: Array<Users>
  userId: number
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
}

// CURRENT CHAT

interface CurrentChat {
  id: number
}

export interface ConversationIdAction {
  type: typeof types.CONVERSATION_ID
  payload: number
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
}
export interface CreateNewChatActionInterface {
  type: typeof types.CONVERSATION_CREATE_NEW_CONVERSATION
  payload: IdsInterface
}

// CLEAR INTERFACES

export interface ClearConversationInterface {
  type: typeof types.CONVERSATION_CLEAR_DATA
}
