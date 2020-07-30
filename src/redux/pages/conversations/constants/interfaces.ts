import * as types from './types';
import { ErrorResponse } from '../../../common/interafaces';

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

export interface UserConversationHistoryActionRequest {
  type: typeof types.CONVERSATION_USER_HISTORY_CONVERSATION
  payload: number
}

export interface UserConversationsActionRequest {
  type: typeof types.CONVERSATIONS_USER_CONVERSATIONS
}

export type ConversationActionsType = ConversationActionSuccess | ConversationActionFail;

interface Messages {
  message: string
  fkSenderId: number
  sendDate: string
}

export interface UserHistoryConversationSuccess {
  data: Array<Messages>
  pagination: Pagination
}

interface UserHistoryConversation {
  success: UserHistoryConversationSuccess
  error: ErrorResponse
}

interface Conversations {
  messageId: number
  fkSenderId: number
  message: string
  messageType: string
  sendDate: string
  conversationId: number,
  conversationType: string,
  conversationCreationDate: string
}

export interface UserConversationsSuccess {
  data: Array<Conversations>
}

interface UserConversations {
  success: UserConversationsSuccess
  error: ErrorResponse
}

export interface ConversationReducerStateInterface {
  userHistoryConversation: UserHistoryConversation
  conversationsList: UserConversations
}

interface PayloadArrayPagination {
  data: []
  pagination: Pagination
}

interface PayloadArray {
  data: []
}

export type ConversationReducerPayload = PayloadArrayPagination | PayloadArray;

export type ConversationReducerStateType = keyof ConversationReducerStateInterface;
