import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_SIGNUP } from '../constants/types';
import { SignUpAction } from '../constants/interfaces';
import { requestSuccess, requestFail, actionLogin } from '../constants/actionConstants';
import { Paths } from '../../../routing/config/paths';

export function* signUpWatcher() {
  yield takeEvery(AUTH_SIGNUP, signUpWorker);
}

function* signUpWorker({ params }: SignUpAction) {
  try {
    const { data } = yield call(axios.post, Paths.signUp, { ...params });
    yield put(requestSuccess(data, 'signUp'));
    yield put(actionLogin({ login: params.login }));
  } catch (error) {
    yield put(requestFail(error, 'signUp'));
  }
}
