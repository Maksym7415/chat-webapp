import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { CONVERSATION_INFO } from '../constants/types';
import { ConversationInfo } from '../constants/interfaces';
import { conversationActionSuccess, conversationActionFail } from '../constants/actionConstants';

export function* conversInfoWatcher() {
  yield takeEvery(CONVERSATION_INFO, conversInfoWorker);
}

function* conversInfoWorker({ payload: { type, id } }: ConversationInfo) {
  try {
    const { data } = yield call(axios.get, `getConversation/${id}?type=${type}`);
    yield put(conversationActionSuccess(data, 'conversationInfo'));
  } catch (error) {
    yield put(conversationActionFail(error.response, 'conversationInfo'));
  }
}
