import * as types from './types';
import { PreloaderActionInterface, CommonReducerInterface } from './interafaces';

const initialState = {
  isShow: false,
};

export default (state = initialState, action: PreloaderActionInterface): CommonReducerInterface => {
  switch (action.type) {
    case types.APP_PRELOADER: {
      return {
        ...state,
        isShow: action.payload,
      };
    }
    default: return state;
  }
};
