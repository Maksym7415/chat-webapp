import * as types from './types';
import {
  SearchObjectInteface,
  GlobalSearchActionInterface,
  InitializedGlobalSearchActionInterface,
} from './interfaces';

export const initializedGlobalSearchAction = (payload: string) : InitializedGlobalSearchActionInterface => ({
  type: types.INITIALIZED_GLOBAL_SEARCH,
  payload,
});

export const globalSearchAction = (payload: Array<SearchObjectInteface>) : GlobalSearchActionInterface => ({
  type: types.SEARCH_GLOBAL_SEARCH,
  payload,
});
