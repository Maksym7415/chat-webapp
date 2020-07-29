import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { CONVERSATION_USER_HISTORY_CONVERSATION } from '../constants/types';
import { UserConversationHistoryActionRequest } from '../constants/interfaces';
import { conversationActionSuccess, conversationActionFail } from '../constants/actionConstants';

export function* userConversationWatcher() {
  yield takeEvery(CONVERSATION_USER_HISTORY_CONVERSATION, loginWorker);
}

function* loginWorker({ payload }: UserConversationHistoryActionRequest) {
  try {
    const { data } = yield call(axios.get, `conversationHistory/${payload}`);
    yield put(conversationActionSuccess(data, 'userHistoryConversation'));
  } catch (error) {
    console.log(error);
    yield put(conversationActionFail({ error }, 'userHistoryConversation'));
  }
}
