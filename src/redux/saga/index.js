import { all } from 'redux-saga/effects';
import { loginWatcher } from '../pages/authorization/sagas/login';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
  ])
};