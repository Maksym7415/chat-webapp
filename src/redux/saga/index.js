import { all } from 'redux-saga/effects';
import { loginWatcher } from '../pages/authorization/sagas/login';
import { signUpWatcher } from '../pages/authorization/sagas/signup';
import { verificationCodeWatcher } from '../pages/authorization/sagas/checkVerificationCode';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signUpWatcher(),
    verificationCodeWatcher()
  ])
};