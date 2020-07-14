import { all } from 'redux-saga/effects';
import { loginWatcher } from '../authorization/sagas';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
  ])
};