/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as types from '../constants/types';
import { ConversationReducerStateInterface, ConversationActionsType } from '../constants/interfaces';

const initialState: ConversationReducerStateInterface = {
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
  conversationsList: {
    success: {
      data: [],
    },
    error: null,
  },
};

const authReducer = (state = initialState, action: ConversationActionsType): ConversationReducerStateInterface => {
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
          error: action.payload,
          ...initialState[action.name],
        },
      };

    default:
      return initialState;
  }
};

export default authReducer;
