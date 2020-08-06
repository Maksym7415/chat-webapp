import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_SIGNUP, AUTH_LOGIN } from '../constants/types';
import { SignUpAction } from '../constants/interfaces';
import { requestSuccess, requestFail, actionLogin } from '../constants/actionConstants';

export function* signUpWatcher() {
  yield takeEvery(AUTH_SIGNUP, signUpWorker);
}

function* signUpWorker({ params }: SignUpAction) {
  try {
    const { data } = yield call(axios.post, 'http://localhost:8081/api/signUp', { ...params });
    yield call(axios.post, 'http://localhost:8081/api/signIn', { login: params.login });
    yield put(requestSuccess(data, 'signUp'));
    yield put(actionLogin({ login: params.login }));
  } catch (error) {
    yield put(requestFail(error, 'signUp'));
  }
}
