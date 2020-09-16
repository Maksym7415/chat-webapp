import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { USER_SET_MAIN_PHOTO } from '../constants/types';
import { SetMainPhotoAction } from '../constants/interfaces';
import { userActionFail, userActionSuccess } from '../constants/actions';

export function* setMainPhotoWatcher() {
  yield takeEvery(USER_SET_MAIN_PHOTO, setMainPhotoWorker);
}

function* setMainPhotoWorker({ userId, photoUrl, photoId }: SetMainPhotoAction) {
  try {
    const { data } = yield call(axios.put, `setMainPhoto/${photoId}/?url=${photoUrl}`);
    yield put(userActionSuccess({ data }, 'setMainPhoto'));
  } catch (error) {
    yield put(userActionFail(error.response, 'setMainPhoto'));
  }
}
