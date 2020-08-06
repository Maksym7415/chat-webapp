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

export interface ConversationReducerStateInterface {
  userHistoryConversation: UserHistoryConversation
  conversationsList: UserConversationsList
}

export type ConversationReducerPayload = PayloadArrayPagination | PayloadArray;

export type ConversationReducerStateType = keyof ConversationReducerStateInterface;

export type ConversationActionsType = ConversationActionSuccess | ConversationActionFail;

// USER_CONVERSATION_HISTORY INTERFACES

interface Messages {
  message: string
  fkSenderId: number
  sendDate: string
}

interface UserHistoryConversation {
  success: UserHistoryConversationSuccess
  error: ErrorResponse
}

export interface UserConversationHistoryActionRequest {
  type: typeof types.CONVERSATION_USER_HISTORY_CONVERSATION
  payload: number
}

export interface UserHistoryConversationSuccess {
  data: Array<Messages>
  pagination: Pagination
}

// USER_CONVERSATIONS

interface UserConversationsList {
  success: UserConversationsListSuccess
  error: ErrorResponse
}

interface ConversationsList {
  messageId: number
  fkSenderId: number
  message: string
  messageType: string
  sendDate: string
  conversationId: number,
  conversationType: string,
  conversationName: string,
  conversationCreationDate: string
}

export interface UserConversationsListSuccess {
  data: Array<ConversationsList>
}

export interface UserConversationsListActionRequest {
  type: typeof types.CONVERSATIONS_USER_CONVERSATIONS
}
