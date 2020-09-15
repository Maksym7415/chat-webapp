import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { USER_UPLOAD_AVATAR } from '../actions/types';
import { UploadAvatarActionInterface } from '../actions/interfaces';
import { userActionFail, userActionSuccess, getAvatarsAction } from '../actions/actions';

export function* getUploadAvatarsWatcher() {
  yield takeEvery(USER_UPLOAD_AVATAR, getUploadAvatarsWorker);
}

function* getUploadAvatarsWorker({ file }: UploadAvatarActionInterface) {
  try {
    const { data } = yield call(axios.post, '/upload', file);
    yield put(userActionSuccess({ data }, 'upload'));
    yield put(getAvatarsAction());
  } catch (error) {
    yield put(userActionFail(error.response, 'upload'));
  }
}
