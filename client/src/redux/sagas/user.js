import { call, put, take } from 'redux-saga/effects';
import { callApi } from '../../axios';
import * as Types from "../actions/type"
import { getAdminInfoSuccess, getUserInfoFailed, getUserInfoSuccess } from '../actions/user';
function getUserApi(token) {
    return callApi({ method: "get", token: token, checkAuth: true, url: "/api/user/user-info" })
}
function getAdminInfoApi() {
    return callApi({ url: "/admin/get-info" })
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
function* getAdminInfo() {
    while (true) {
        let action = yield take(Types.GET_ADMIN_INFO);
        try {
            let result = yield call(getAdminInfoApi);
            yield put(getAdminInfoSuccess(result))
        }
        catch (e) {
        }
    }
}
export const userSaga = [
    getUserSaga(),
    getAdminInfo()
]