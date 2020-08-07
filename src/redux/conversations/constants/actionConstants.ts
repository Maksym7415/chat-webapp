import * as types from './types';
import {
  ConversationActionsType, UserConversationHistoryActionRequest, UserConversationsListActionRequest, ConversationReducerStateType, ConversationReducerPayload, LastConversationMessageAction, Messages, ConversationAddNewMessageAction,
} from './interfaces';
import { ErrorResponse } from '../../common/interafaces';

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

export const conversationUserHistoryActionRequest = (id: number): UserConversationHistoryActionRequest => ({
  type: types.CONVERSATION_USER_HISTORY_CONVERSATION,
  id,
});

export const lastConversationMessageAction = (data: ConversationReducerPayload): LastConversationMessageAction => ({
  type: types.GET_LAST_CONVERSATION_MESSAGE,
  data,
});

export const conversationAddNewMessage = (message: Messages): ConversationAddNewMessageAction => ({
  type: types.CONVERSATIONS_ADD_NEW_MESSAGE,
  message,
});

export const getUserConversationsActionRequest = (): UserConversationsListActionRequest => ({ type: types.CONVERSATIONS_USER_CONVERSATIONS });
