/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import * as interfaces from './interfaces';
import { ErrorResponse } from '../../common/interafaces';

export const conversationActionSuccess = (payload: interfaces.ConversationReducerPayload, name: interfaces.ConversationReducerStateType): interfaces.ConversationActionsType => ({
  type: types.CONVERSATION_SUCCESS,
  payload,
  name,
});

export const conversationActionFail = (payload: ErrorResponse, name: interfaces.ConversationReducerStateType): interfaces.ConversationActionsType => ({
  type: types.CONVERSATION_FAIL,
  payload,
  name,
});

export const conversationUserHistoryActionRequest = (id: number, offset: number): interfaces.UserConversationHistoryActionRequest => ({
  type: types.CONVERSATION_USER_HISTORY_CONVERSATION,
  id,
  offset,
});

export const lastConversationMessageAction = (data: interfaces.ConversationReducerPayload): interfaces.LastConversationMessageAction => ({
  type: types.GET_LAST_CONVERSATION_MESSAGE,
  data,
});

export const conversationAddNewMessage = (message: interfaces.Messages, id: number): interfaces.ConversationAddNewMessageAction => ({
  type: types.CONVERSATIONS_ADD_NEW_MESSAGE,
  message,
  id,
});

export const getUserConversationsActionRequest = (): interfaces.UserConversationsListActionRequest => ({ type: types.CONVERSATIONS_USER_CONVERSATIONS });

export const getConversationIdAction = (id: number, type: string): interfaces.ConversationIdAction => ({
  type: types.CONVERSATION_ID,
  payload: {
    id,
    type,
  },
});

export const conversationTypeStateAction = (conversationId: number, isTyping: boolean, users: Array<interfaces.Users>, userId: number): interfaces.ConversationTypeStateInterfaceAction => ({
  type: types.CONVERSATION_TYPE_STATE,
  payload: {
    conversationId,
    isTyping,
    users,
    userId,
  },
});

export const createNewChatAction = (ids: interfaces.IdsInterface): interfaces.CreateNewChatActionInterface => ({
  type: types.CONVERSATION_CREATE_NEW_CONVERSATION,
  payload: ids,
});

export const clearConversationData = () : interfaces.ClearConversationInterface => ({
  type: types.CONVERSATION_CLEAR_DATA,
});
