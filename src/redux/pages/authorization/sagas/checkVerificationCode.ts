import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_VERIFICATION_CODE } from '../constants/types';
import { CheckVerificationCode } from '../constants/interfaces';
import { requestSuccess, requestFail } from '../constants/actionConstatns';

export function* verificationCodeWatcher() {
  yield takeEvery(AUTH_VERIFICATION_CODE, loginWorker);
}

function* loginWorker({ params }: CheckVerificationCode) {
  try {
    const { data } = yield call(axios.post, '/checkVerificationCode', params);
    yield put(requestSuccess(data, 'verification'));
  } catch (error) {
    console.log(error);
    yield put(requestFail({ error }, 'verification'));
  }
}
