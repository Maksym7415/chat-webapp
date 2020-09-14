import * as types from './types';
import * as interafaces from './interafaces';

const initialState: interafaces.CommonReducerInterface = {
  preloader: false,
  contextMenu: {
    xPos: '',
    yPos: '',
    isShowMenu: false,
  },
};

export default (state = initialState, action: interafaces.CommonReducerActions): interafaces.CommonReducerInterface => {
  switch (action.type) {
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
    default: return state;
  }
};
