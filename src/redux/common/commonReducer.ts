/* eslint-disable import/no-cycle */
import * as types from './types';
import * as interafaces from './interafaces';

const initialState: interafaces.CommonReducerInterface = {
  preloader: false,
  contextMenu: {
    xPos: '100',
    yPos: '100',
    isShowMenu: false,
    messageId: 0,
    config: [],
  },
  messageEdit: {
    isEdit: false,
    isDelete: false,
    messageId: null,
  },
  dialogComponent: {
    isShow: false,
    title: '',
  },
  sheraMessages: [],
  lang: localStorage.getItem('@@lang') || 'ua',
};

export default (state = initialState, action: interafaces.CommonReducerActions): interafaces.CommonReducerInterface => {
  switch (action.type) {
    case types.SET_LANGUAGE: {
      localStorage.setItem('@@lang', action.payload);
      return {
        ...state,
        lang: action.payload,
      };
    }
    case types.APP_PRELOADER: {
      return {
        ...state,
        preloader: action.payload,
      };
    }
    case types.SHOW_CONTEXT_MENU: {
      return {
        ...state,
        contextMenu: action.payload,
      };
    }
    case types.IS_EDIT_MESSAGE: {
      return {
        ...state,
        messageEdit: {
          ...state.messageEdit,
          ...action.payload,
        },
      };
    }
    case types.IS_DELETE_MESSAGE: {
      return {
        ...state,
        messageEdit: {
          ...state.messageEdit,
          ...action.payload,
        },
      };
    }
    case types.DIALOG_COMPONENT_SHOW: {
      return {
        ...state,
        dialogComponent: action.payload,
      };
    }
    case types.DIALOG_COMPONENT_HIDDEN: {
      return {
        ...state,
        dialogComponent: initialState.dialogComponent,
      };
    }
    case types.SHARE_MESSAGES: {
      return {
        ...state,
        sheraMessages: action.payload,
      };
    }
    default: return state;
  }
};
