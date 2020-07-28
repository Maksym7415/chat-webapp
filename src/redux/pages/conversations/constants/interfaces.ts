/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ConversationReducerKeyType } from '../reducer/types';

interface SimpleErrorResponse {
  code: number
  message: string
}

interface ComplexErrorResponse {
  code: number
  message: string
  details: SimpleErrorResponse[]
}

interface ConversationHistorySuccess {
  data: []
  pagination: {
    allItems: number,
    currentPage: number
  }
}

interface ConversationSuccess {
  type: typeof types.CONVERSATION_SUCCESS
  payload: object,
  name: ConversationReducerKeyType
}

interface ConversationFail {
  type: typeof types.CONVERSATION_FAIL
  payload: object,
  name: ConversationReducerKeyType
}

export interface UserHistoryConversationAction {
  type: typeof types.CONVERSATION_USER_HISTORY_CONVERSATION
  id: number
}

export interface UserHistoryConversationInterface {
  success: ConversationHistorySuccess
  error: SimpleErrorResponse | ComplexErrorResponse | null
}

export type ConversationActionsType = ConversationSuccess | ConversationFail;
