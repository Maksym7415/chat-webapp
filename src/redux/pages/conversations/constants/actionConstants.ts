import * as types from './types';
import {
  ConversationActionsType, UserConversationHistoryActionRequest, UserConversationsActionRequest, ConversationReducerStateType, ConversationReducerPayload,
} from './interfaces';
import { ErrorResponse } from '../../../common/interafaces';

export const conversationActionSuccess = (payload: ConversationReducerPayload, name: ConversationReducerStateType): ConversationActionsType => ({
  type: types.CONVERSATION_SUCCESS,
  payload,
  name,
});

export const conversationActionFail = (payload: ErrorResponse, name: ConversationReducerStateType): ConversationActionsType => ({
  type: types.CONVERSATION_FAIL,
  payload,
  name,
});

export const conversationUserHistoryActionRequest = (payload: number): UserConversationHistoryActionRequest => ({
  type: types.CONVERSATION_USER_HISTORY_CONVERSATION,
  payload,
});

export const getUserConversationsActionRequest = (): UserConversationsActionRequest => ({ type: types.CONVERSATIONS_USER_CONVERSATIONS });
