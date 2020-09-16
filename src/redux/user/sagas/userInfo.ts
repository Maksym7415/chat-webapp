import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { USER_GET_USER_INFO } from '../constants/types';
import { UserInfoActionInterface } from '../constants/interfaces';
import { userActionFail, userActionSuccess } from '../constants/actions';

export function* userInfoWatcher() {
  yield takeEvery(USER_GET_USER_INFO, userInfoWorker);
}

function* userInfoWorker({ id }: UserInfoActionInterface) {
  try {
    const { data } = yield call(axios.get, `getUserProfileData/${id}`);
    yield put(userActionSuccess({ data }, 'userInfo'));
  } catch (error) {
    yield put(userActionFail(error.response, 'userInfo'));
  }
}
