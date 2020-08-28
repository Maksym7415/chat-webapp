import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { INITIALIZED_GLOBAL_SEARCH } from '../constants/types';
import { InitializedGlobalSearchActionInterface } from '../constants/interfaces';
import { globalSearchAction } from '../constants/actionConstants';

export function* globalSearchWatcher() {
  yield takeEvery(INITIALIZED_GLOBAL_SEARCH, globalSearchWorker);
}

function* globalSearchWorker({ payload }: InitializedGlobalSearchActionInterface) {
  try {
    const { data } = yield call(axios.get, `searchContact?searchRequest=${payload}`);
    yield put(globalSearchAction(data.response));
  } catch (error) {
    console.log({ error });
    // yield put(conversationActionFail(error.response, 'userHistoryConversation'));
  }
}
