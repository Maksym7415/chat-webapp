import { all } from 'redux-saga/effects';
import { loginWatcher } from '../authorization/sagas/login';
import { signUpWatcher } from '../authorization/sagas/signup';
import { verificationCodeWatcher } from '../authorization/sagas/checkVerificationCode';
import { userConversationWatcher } from '../conversations/sagas/userConversationHistory';
import { userConversationsListWatcher } from '../conversations/sagas/userConversationsList';
import { userInfoWatcher } from '../user/sagas/userInfo';
import { globalSearchWatcher } from '../search/sagas/globalSearch';
import { createConversWatcher } from '../conversations/sagas/createNewConversation';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signUpWatcher(),
    verificationCodeWatcher(),
    userConversationWatcher(),
    userConversationsListWatcher(),
    userInfoWatcher(),
    globalSearchWatcher(),
    createConversWatcher(),
  ]);
}
