/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConversationReducernterface } from './intefaces';
import { ConversationActionsType } from '../constants/interfaces';
import * as types from '../constants/types';

const initialState: ConversationReducernterface = {
  userHistoryConversation: {
    success: {
      data: [],
      pagination: {
        allItems: 0,
        currentPage: 0,
      },
    },
    error: null,
  },
};

const authReducer = (state = initialState, action: ConversationActionsType): ConversationReducernterface => {
  switch (action.type) {
    case types.CONVERSATION_SUCCESS:
      return {
        ...state,
        [action.name]: {
          success: action.payload,
          error: null,
        },
      };
    case types.CONVERSATION_FAIL:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          error: action.payload,
        },

      };

    default:
      return initialState;
  }
};

export default authReducer;
