import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_LOGIN } from '../constants/types';
import { requestSuccess, requestFail } from '../constants/actionConstants';
import { Paths } from '../../../routing/config/paths';

export function* loginWatcher() {
  yield takeEvery(AUTH_LOGIN, loginWorker);
}

function* loginWorker({ login }: any) {
  try {
    const response = yield call(axios.post, Paths.signIn, { ...login });
    yield put(requestSuccess(response, 'login'));
  } catch (error) {
    yield put(requestFail(error, 'login'));
  }
}
