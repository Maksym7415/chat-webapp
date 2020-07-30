import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { CONVERSATIONS_USER_CONVERSATIONS } from '../constants/types';
import { UserConversationHistoryActionRequest } from '../constants/interfaces';
import { conversationActionSuccess, conversationActionFail } from '../constants/actionConstants';

export function* userConversationsListWatcher() {
  yield takeEvery(CONVERSATIONS_USER_CONVERSATIONS, userConversationsListWorker);
}

function* userConversationsListWorker() {
  try {
    const { data } = yield call(axios.get, '/getUserConversations');
    yield put(conversationActionSuccess(data, 'conversationsList'));
  } catch (error) {
    yield put(conversationActionFail(error.response, 'conversationsList'));
  }
}
