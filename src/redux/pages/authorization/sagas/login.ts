import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_LOGIN } from '../constants/types';
import { LoginAction } from '../constants/interfaces';
import { requestSuccess, requestFail } from '../constants/actionConstatns';

export function* loginWatcher() {
  yield takeEvery(AUTH_LOGIN, loginWorker)
};

function* loginWorker(action: LoginAction) {
  try {
    const response = yield call(axios.post, 'http://localhost:8081/api/signIn', {login: action.login});
    console.log(response);
    yield put(requestSuccess({status: true}, 'login'));
  } catch(error) {
    console.log(error);
    yield put(requestFail({error}, 'login'));
  }
}