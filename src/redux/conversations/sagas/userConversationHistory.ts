import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { CONVERSATION_USER_HISTORY_CONVERSATION } from '../constants/types';
import { UserConversationHistoryActionRequest } from '../constants/interfaces';
import { conversationActionSuccess, conversationActionFail } from '../constants/actionConstants';

export function* userConversationWatcher() {
  yield takeEvery(CONVERSATION_USER_HISTORY_CONVERSATION, userConversationWorker);
}

function* userConversationWorker({ id }: UserConversationHistoryActionRequest) {
  try {
    const { data } = yield call(axios.get, `conversationHistory/${id}`);
    yield put(conversationActionSuccess(data, 'userHistoryConversation'));
  } catch (error) {
    yield put(conversationActionFail(error.response, 'userHistoryConversation'));
  }
}
