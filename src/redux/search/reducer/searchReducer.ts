import * as types from '../constants/types';
import {
  SearchActionType,
  GlobalSearchReducerInterface,
} from '../constants/interfaces';

const initialState: GlobalSearchReducerInterface = {
  globalSearchResult: [],
};

export default (state = initialState, action: SearchActionType): GlobalSearchReducerInterface => {
  switch (action.type) {
    case types.SEARCH_GLOBAL_SEARCH:
      return {
        ...state,
        globalSearchResult: action.payload,
      };

    default: return state;
  }
};
