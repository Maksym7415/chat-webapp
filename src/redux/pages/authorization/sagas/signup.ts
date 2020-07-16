import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_SIGNUP } from '../constants/types';
import { SignUpAction } from '../constants/interfaces';
import { requestSuccess, requestFail } from '../constants/actionConstatns';

export function* signUpWatcher() {
    yield takeEvery(AUTH_SIGNUP, signUpWorker);
}

function* signUpWorker({params}: SignUpAction) {
    try {
        const { data } = yield call(axios.post, 'http://localhost:8081/api/signUp', {...params});
        yield put(requestSuccess(data, 'signUp'));
    } catch (error) {
        yield put(requestFail({response: error.response}, 'signUp'));
    }
}