/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ConversationActionsType, UserConversationHistoryActionRequest } from './interfaces';

export const conversationActionSuccess = (payload: object, name: string): ConversationActionsType => ({
  type: types.CONVERSATION_SUCCESS,
  payload,
  name,
});

export const conversationActionFail = (payload: object, name: string): ConversationActionsType => ({
  type: types.CONVERSATION_SUCCESS,
  payload,
  name,
});

export const conversationUserHistoryActionRequest = (payload: number): UserConversationHistoryActionRequest => ({
  type: types.CONVERSATION_USER_HISTORY_CONVERSATION,
  payload,
});

export const getUserConversationsActionRequest = (payload: number): UserConversationHistoryActionRequest => ({
  type: types.CONVERSATIONS_USER_CONVERSATIONS,
  payload,
});
