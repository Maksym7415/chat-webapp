/* eslint-disable @typescript-eslint/ban-types */
import * as types from './types';
import { ConversationActionsType, UserHistoryConversationAction } from './interfaces';
import { ConversationReducerKeyType } from '../reducer/types';

export const requestSuccess = (payload: object, name: ConversationReducerKeyType): ConversationActionsType => ({
  type: types.CONVERSATION_SUCCESS,
  payload,
  name,
});

export const requestFail = (payload: object, name: ConversationReducerKeyType): ConversationActionsType => ({
  type: types.CONVERSATION_FAIL,
  payload,
  name,
});

export const userHistoryConversationAction = (id: number): UserHistoryConversationAction => ({
  type: types.CONVERSATION_USER_HISTORY_CONVERSATION,
  id,
});
