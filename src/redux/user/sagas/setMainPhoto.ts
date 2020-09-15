import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { USER_GET_USER_INFO, USER_SET_MAIN_PHOTO } from '../actions/types';
import { SetMainPhotoAction } from '../actions/interfaces';
import { userActionFail, userActionSuccess } from '../actions/actions';

export function* userInfoWatcher() {
  yield takeEvery(USER_SET_MAIN_PHOTO, userInfoWorker);
}

function* userInfoWorker({ userId, photoUrl, photoId }: SetMainPhotoAction) {
  try {
    const { data } = yield call(axios.put, `setMainPhoto/${userId}/${photoId}/?url=${photoUrl}`);
    yield put(userActionSuccess({ data }, 'setMainPhoto'));
  } catch (error) {
    yield put(userActionFail(error.response, 'setMainPhoto'));
  }
}
