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
  conversations: {
    message: '',
    id: 0,
    sendDate: '',
  },
  currentChat: {
    id: 0,
  },
};

const ConversationsReducer = (state = initialState, action: ConversationActionsType): ConversationReducerStateInterface => {
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
    case types.CONVERSATION_USER_HISTORY_CONVERSATION: {
      return {
        ...state,
        currentChat: {
          id: action.id,
        },
      };
    }
    case types.CONVERSATIONS_ADD_NEW_MESSAGE: {
      return {
        ...state,
        userHistoryConversation: {
          success: {
            data: [...state.userHistoryConversation.success.data, action.message],
            pagination: {
              allItems: 0,
              currentPage: 0,
            },
          },
          error: null,
        },
      };
    }

    default:
      return state;
  }
};

export default ConversationsReducer;
