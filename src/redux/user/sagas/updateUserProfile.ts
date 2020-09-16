import {
  takeEvery, call, put, select,
} from 'redux-saga/effects';
import axios from 'axios';
import { UPDATE_USER_PROFILE } from '../constants/types';
import { UpdateUserProfileAction } from '../constants/interfaces';
import { userInfoActionRequest } from '../constants/actions';

export function* updateUserProfileWatcher() {
  yield takeEvery(UPDATE_USER_PROFILE, updateUserProfileWorker);
}

function* updateUserProfileWorker({ payload }: UpdateUserProfileAction) {
  try {
    const userId = yield select((state) => state.authReducer.tokenPayload.userId);
    const { data } = yield call(axios.put, 'updateProfile', payload);
    yield put(userInfoActionRequest(userId));
  } catch (error) {
    console.log(error);
  }
}
