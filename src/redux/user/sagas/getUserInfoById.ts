import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { USER_GET_USER_INFO_BY_ID } from '../constants/types';
import { UserInfoActionInterface } from '../constants/interfaces';
import { userActionFail, userActionSuccess } from '../constants/actions';

export function* userInfoByIdWatcher() {
  yield takeEvery(USER_GET_USER_INFO_BY_ID, userInfoByIdWorker);
}

function* userInfoByIdWorker({ id }: UserInfoActionInterface) {
  try {
    const { data } = yield call(axios.get, `/getUserProfileById/${id}`);
    yield put(userActionSuccess({ data }, 'userInfoById'));
  } catch (error) {
    yield put(userActionFail(error.response, 'userInfoById'));
  }
}
