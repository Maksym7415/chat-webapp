import * as types from './types';

export interface SearchObjectInteface {
  id: number
  fkUserId: number
  fkContactId: number
  pseudonyme: string
  type: string
}

export interface InitializedGlobalSearchActionInterface {
  type: typeof types.INITIALIZED_GLOBAL_SEARCH,
  payload: string
}

export interface GlobalSearchActionInterface {
  type: typeof types.SEARCH_GLOBAL_SEARCH,
  payload: Array<SearchObjectInteface>
}

export interface GlobalSearchReducerInterface {
  globalSearchResult: Array<SearchObjectInteface>
}

export type SearchActionType = GlobalSearchActionInterface | GlobalSearchActionInterface;
