import {
  takeEvery, call, put,
} from 'redux-saga/effects';
import axios from 'axios';
import { USER_GET_AVATARS } from '../constants/types';
import { GetAvatarsActionInteface } from '../constants/interfaces';
import { userActionFail, userActionSuccess } from '../constants/actions';

export function* getAvatarsWatcher() {
  yield takeEvery(USER_GET_AVATARS, getAvatarsWorker);
}

function* getAvatarsWorker(data: GetAvatarsActionInteface) {
  try {
    const { data } = yield call(axios.get, '/getAvatars');
    yield put(userActionSuccess({ data }, 'avatars'));
  } catch (error) {
    yield put(userActionFail(error.response, 'avatars'));
  }
}
