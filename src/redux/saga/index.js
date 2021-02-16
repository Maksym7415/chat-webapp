import { all } from 'redux-saga/effects';
import { loginWatcher } from '../authorization/sagas/login';
import { signUpWatcher } from '../authorization/sagas/signup';
import { verificationCodeWatcher } from '../authorization/sagas/checkVerificationCode';
import { userConversationWatcher } from '../conversations/sagas/userConversationHistory';
import { userConversationsListWatcher } from '../conversations/sagas/userConversationsList';
import { userInfoWatcher } from '../user/sagas/userInfo';
import { globalSearchWatcher } from '../search/sagas/globalSearch';
import { createConversWatcher } from '../conversations/sagas/createNewConversation';
import { conversInfoWatcher } from '../conversations/sagas/conversationInfo';
import { getAvatarsWatcher } from '../user/sagas/getUserAvatars';
import { setMainPhotoWatcher } from '../user/sagas/setMainPhoto.ts';
import { getUploadAvatarsWatcher } from '../user/sagas/uploadAvatar';
import { updateUserProfileWatcher } from '../user/sagas/updateUserProfile';
import { userInfoByIdWatcher } from '../user/sagas/getUserInfoById';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signUpWatcher(),
    verificationCodeWatcher(),
    userConversationWatcher(),
    userInfoByIdWatcher(),
    userConversationsListWatcher(),
    userInfoWatcher(),
    globalSearchWatcher(),
    createConversWatcher(),
    getAvatarsWatcher(),
    setMainPhotoWatcher(),
    getUploadAvatarsWatcher(),
    updateUserProfileWatcher(),
    conversInfoWatcher(),
  ]);
}
