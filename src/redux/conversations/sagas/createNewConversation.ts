import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { CONVERSATION_CREATE_NEW_CONVERSATION } from '../constants/types';
import { CreateNewChatActionInterface } from '../constants/interfaces';
import { conversationActionSuccess, conversationActionFail } from '../constants/actionConstants';

export function* createConversWatcher() {
  yield takeEvery(CONVERSATION_CREATE_NEW_CONVERSATION, createConversWorker);
}

function* createConversWorker({ payload: { userId, opponentId } }: CreateNewChatActionInterface) {
  try {
    const { data } = yield call(axios.get, `getOpponentsIdWhereConversTypeDialog?userId=${userId}&opponentId=${opponentId}`);
    yield put(conversationActionSuccess(data, 'createConversation'));
  } catch (error) {
    yield put(conversationActionFail(error.response, 'createConversation'));
  }
}
