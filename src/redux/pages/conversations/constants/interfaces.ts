/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ErrorResponse } from '../../../common/interafaces';

interface ConversationActionSuccess {
  type: typeof types.CONVERSATION_SUCCESS
  payload: object,
  name: string
}

interface ConversationActionFail {
  type: typeof types.CONVERSATION_FAIL
  payload: object,
  name: string
}

export interface UserConversationHistoryActionRequest {
  type: typeof types.CONVERSATION_USER_HISTORY_CONVERSATION
  payload: number
}

export type ConversationActionsType = ConversationActionSuccess | ConversationActionFail;

interface UserHistoryConversationSuccess {
  data: Array<object>
  pagination: {
    allItems: number
    currentPage: number
  }
}

interface UserHistoryConversation {
  success: UserHistoryConversationSuccess
  error: ErrorResponse
}

export interface ConversationReducerStateInterface {
  userHistoryConversation: UserHistoryConversation
}
