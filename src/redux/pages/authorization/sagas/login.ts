import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN } from '../constants/types';
import { LoginAction } from '../constants/interfaces';
import { requestSuccess, requestFail } from '../constants/actionConstatns';

export function* loginWatcher() {
  yield takeEvery(LOGIN, loginWorker)
};

function* loginWorker(action: LoginAction) {
  try {
    const response = yield call(axios.post, 'http://localhost:8081/api/signIn', {login: action.login});
    yield put(requestSuccess({status: response.status}, 'login'));
  } catch(error) {
    console.log(error.response)
    yield put(requestFail(error, 'login'))
  }
}