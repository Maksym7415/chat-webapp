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
  lastMessages: {},
  currentConversationIdObject: {
    currentConversationId: 0,
  },
  conversationId: {
    id: 0,
  },
  conversationTypeState: {
    0: {
      isTyping: false,
      userId: 0,
      users: [{
        isTyping: false,
        firstName: '',
        userId: 0,
      }],
    },
  },
  createConversation: {
    success: {
      data: [],
    },
    error: null,
  },
  opponentId: {
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
        lastMessages: {
          ...state.lastMessages,
          [action.id]: action.message,
        },
        currentConversationIdObject: {
          currentConversationId: action.id,
        },
      };
    }
    case types.CONVERSATION_ID: {
      return {
        ...state,
        conversationId: {
          id: action.payload,
        },
      };
    }
    case types.CONVERSATION_TYPE_STATE: {
      return {
        ...state,
        conversationTypeState: { ...state.conversationTypeState, [action.payload.conversationId]: action.payload },
      };
    }
    case types.CONVERSATION_CREATE_NEW_CONVERSATION: {
      return {
        ...state,
        opponentId: {
          id: action.payload.opponentId,
        },
      };
    }
    default:
      return state;
  }
};

export default ConversationsReducer;
