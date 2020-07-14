import { put, call, takeEvery, all, fork } from "redux-saga/effects";
import { loginRequest } from '../requests/login'
import * as actionCreators from "../actionCreators/loginAction";
import * as actionTypes from "../actionTypes/loginActionTypes";


function* onLoadLyrics({ payload }: actionTypes.LoginRequest) {
    try {
        const { data } = yield call(loginRequest, { ...payload });
        console.log(data)
        yield put(actionCreators.loginSuccessAction(data));
    } catch (error) {
        yield put(actionCreators.loginFailureAction(error));
    }
}

function* watchOnLoadLyrics() {
    yield takeEvery(actionTypes.LOGIN_REQUEST, onLoadLyrics);
}

export default function* lyricsSaga() {
    yield all([fork(watchOnLoadLyrics)]);
}
