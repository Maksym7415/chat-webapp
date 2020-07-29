import { all } from 'redux-saga/effects';
import { loginWatcher } from '../pages/authorization/sagas/login';
import { signUpWatcher } from '../pages/authorization/sagas/signup';
import { verificationCodeWatcher } from '../pages/authorization/sagas/checkVerificationCode';
import { userConversationWatcher } from '../pages/conversations/sagas/userConversationHistory';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signUpWatcher(),
    verificationCodeWatcher(),
    userConversationWatcher(),
  ]);
}
