import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversationMessages: {
    data: [],
    pagination: {
      allItems: 0,
      currentPage: 0,
    },
  },
  userHistoryConversations: {
    // [0]: {
    //   pagination: {
    //     allItems: 0,
    //     currentPage: 0,
    //   },
    // },
  },
  conversationsList: {
    data: {},
  },
  conversationTypeState: {
    0: {
      isTyping: false,
      userId: 0,
      users: [
        {
          isTyping: false,
          firstName: "",
          userId: 0,
        },
      ],
    },
  },
};

const conversationsSlice = createSlice({
  name: "conversationsSlice",
  initialState,
  reducers: {
    conversationTypeStateAction(state, { payload }) {
      state.conversationTypeState = {
        ...state.conversationTypeState,
        [payload.conversationId]: payload,
      };
    },
    updateConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...state.conversationsList.data,
        ...payload,
      };
    },
    setConversationListAction(state, { payload }) {
      state.conversationsList.data = {
        ...payload,
      };
    },
    updateUserHistoryConversation(state, { payload }) {
      state.userHistoryConversations = {
        ...state.userHistoryConversations,
        [payload.conversationId]: {
          ...state.userHistoryConversations?.[payload.conversationId],
          ...payload.data,
        },
      };
    },
  },
});

export const {
  conversationTypeStateAction,
  updateConversationListAction,
  updateUserHistoryConversation,
  setConversationListAction,
} = conversationsSlice.actions;

export default conversationsSlice.reducer;
