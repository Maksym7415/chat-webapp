import { ConversationInfo, ConversationReducerStateInterface, ConversationActionsType } from '../constants/interfaces';
import { conversationActionFail } from '../constants/actionConstants';
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as types from '../constants/types';

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
  editedMessage: null,
  deleteMessageId: {
    id: null,
  },
  currentConversationIdObject: {
    currentConversationId: 0,
    conversationInfo: {},
  },
  conversationId: {
    id: 0,
    type: '',
  },
  conversationTypeState: {
    isTyping: false,
    conversationId: 0,
    user: {
      isTyping: false,
      firstName: '',
      userId: 0,
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
    name: '',
  },
  conversationInfo: {
    success: {
      Users: [{
        firstName: '', userUpdateTime: '', activityStatus: '', id: 0,
      }],
      conversationAvatar: '',
      conversationCreationDate: '',
      conversationName: '',
      conversationType: '',
      conversationUpdateDate: null,
      id: 0,
    },
    error: null,
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
          conversationInfo: action.conversationInfo,
        },
      };
    }
    case types.CONVERSATIONS_EDIT_MESSAGE: {
      return {
        ...state,
        editedMessage: action.message,
      };
    }
    case types.CONVERSATIONS_DELETE_MESSAGE: {
      return {
        ...state,
        deleteMessageId: { id: action.id },
      };
    }
    case types.CONVERSATION_ID: {
      return {
        ...state,
        conversationId: action.payload,
      };
    }
    case types.CONVERSATION_TYPE_STATE: {
      return {
        ...state,
        conversationTypeState: action.payload,
      };
    }
    case types.CONVERSATION_CREATE_NEW_CONVERSATION: {
      return {
        ...state,
        opponentId: {
          id: action.payload.opponentId,
          name: action.payload.name,
        },
      };
    }
    case types.CONVERSATION_CLEAR_DATA: {
      return {
        ...state,
        userHistoryConversation: initialState.userHistoryConversation,
        lastMessages: initialState.lastMessages,
        conversationsList: initialState.conversationsList,
      };
    }
    // case types.CONVERSATION_INFO: {
    //   return {
    //     ...state,
    //     conversationInfo: action.payload,
    //   };
    // }
    default:
      return state;
  }
};

export default ConversationsReducer;
