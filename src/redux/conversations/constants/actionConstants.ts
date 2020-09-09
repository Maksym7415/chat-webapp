/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import {
  ConversationActionsType,
  UserConversationHistoryActionRequest,
  UserConversationsListActionRequest,
  ConversationReducerStateType,
  ConversationReducerPayload,
  LastConversationMessageAction,
  Messages,
  ConversationAddNewMessageAction,
  ConversationIdAction,
  ConversationTypeStateInterfaceAction,
  Users,
  CreateNewChatActionInterface,
  IdsInterface,
  ClearConversationInterface,
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

export const conversationUserHistoryActionRequest = (id: number, offset: number): UserConversationHistoryActionRequest => ({
  type: types.CONVERSATION_USER_HISTORY_CONVERSATION,
  id,
  offset,
});

export const lastConversationMessageAction = (data: ConversationReducerPayload): LastConversationMessageAction => ({
  type: types.GET_LAST_CONVERSATION_MESSAGE,
  data,
});

export const conversationAddNewMessage = (message: Messages, id: number): ConversationAddNewMessageAction => ({
  type: types.CONVERSATIONS_ADD_NEW_MESSAGE,
  message,
  id,
});

export const getUserConversationsActionRequest = (): UserConversationsListActionRequest => ({ type: types.CONVERSATIONS_USER_CONVERSATIONS });

export const getConversationIdAction = (id: number): ConversationIdAction => ({
  type: types.CONVERSATION_ID,
  payload: id,
});

export const conversationTypeStateAction = (conversationId: number, isTyping: boolean, users: Array<Users>, userId: number): ConversationTypeStateInterfaceAction => ({
  type: types.CONVERSATION_TYPE_STATE,
  payload: {
    conversationId,
    isTyping,
    users,
    userId,
  },
});

export const createNewChatAction = (ids: IdsInterface): CreateNewChatActionInterface => ({
  type: types.CONVERSATION_CREATE_NEW_CONVERSATION,
  payload: ids,
});

export const clearConversationData = () : ClearConversationInterface => ({
  type: types.CONVERSATION_CLEAR_DATA,
});
