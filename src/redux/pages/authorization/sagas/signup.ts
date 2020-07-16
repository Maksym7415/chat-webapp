import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { AUTH_SIGNUP } from '../constants/types';
import { SignUpAction } from '../constants/interfaces';
import { requestSuccess, requestFail } from '../constants/actionConstatns';

function* signUpWatcher() {
    yield takeEvery(AUTH_SIGNUP, signUpWorker);
}

function* signUpWorker(action: SignUpAction) {
    try {
        const response = yield call(axios.post, '/http://localhost:8081/api/signIn', action.params);
        console.log(response);
        yield put(requestSuccess({response}, 'signUp'));
    } catch (error) {
        yield put(requestFail({response: error.response}, 'signUp'));
    }
}