import { call, put, take } from 'redux-saga/effects';
import { callApi } from '../../axios';
import * as Types from "../actions/type"
import { getUserInfoFailed, getUserInfoSuccess } from '../actions/user';
function getUserApi(token) {
    return callApi({ method: "get", token: token, checkAuth: true, url: "/api/user/user-info" })
}
function* getUserSaga() {
    while (true) {
        let action = yield take(Types.GET_USER_INFO);
        try {
            let token = localStorage.getItem("_user");
            let user = yield call(getUserApi, token);
            console.log("xxxx user", user)
            if (user !== "failed") {
                yield put(getUserInfoSuccess(user))
            }
        }
        catch (e) {
            yield put(getUserInfoFailed(e))
        }
    }
}
export const userSaga = [
    getUserSaga()
]