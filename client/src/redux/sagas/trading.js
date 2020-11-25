import { call, put, select, take } from 'redux-saga/effects';
import { addSpaceToCardNumber } from '../../utils';
import { callApi } from '../../axios';
import { checkCardNumberFailed, checkCardNumberSuccess, searchListTradingSuccess, tradingFailed, tradingSuccess } from '../actions/trading';
import * as Types from "../actions/type"
import { getUserInfo } from '../actions/user';
function getUserFullNameFromCardNumber(cardNumber) {
    return callApi({ url: "/api/user/user-fullname", data: { cardNumber: cardNumber } })
}
function tradingApi(cardNumber, money, note, token) {
    return callApi({ url: "/api/trading/add-trading", data: { money: money, cardNumber: cardNumber, note: note }, checkAuth: true, token: token })
}
function searchListTradingApi(dateFrom, dateEnd, cardNumber, token) {
    return callApi({ url: "/api/trading/get-trading", data: { dateFrom: dateFrom, dateEnd: dateEnd, cardNumber: cardNumber }, token: token, checkAuth: true })
}
function* getUserFullName() {
    while (true) {
        let action = yield take(Types.CHECK_CARD_NUMBER);
        try {
            let cardNumber = action.cardNumber
            let userState = yield select((state) => state.userReducer);
            console.log("xxxxx ", cardNumber)

            let userFullName = yield call(getUserFullNameFromCardNumber, cardNumber);
            console.log("xxx userfullName", userFullName)
            if (userFullName !== "failed") {
                yield put(checkCardNumberSuccess(userFullName))
            } else {
                yield put(checkCardNumberFailed())
            }

        }
        catch (e) {
            yield put(checkCardNumberFailed())
        }
    }
}
function* trading() {
    while (true) {
        let action = yield take(Types.USER_TRADING);
        try {
            let token = localStorage.getItem("_user");
            let resultCall = yield call(tradingApi, action.cardNumber, action.money, action.note, token);
            if (resultCall === "success") {
                yield put(tradingSuccess());
                yield put(getUserInfo());
            } else {
                yield put(tradingFailed("Không tìm thấy số tài khoản!"))
            }
        }
        catch {
            yield put(tradingFailed("Không tìm thấy số tài khoản!"))
        }
    }
}
function* searchListTradingSaga() {
    while (true) {
        let action = yield take(Types.SEARCH_LIST_TRADING);
        try {
            let userState = yield select((state) => state.userReducer);
            let token = localStorage.getItem("_user");
            let resultCall = yield call(searchListTradingApi, action.dateFrom, action.dateEnd, userState.infoUser.cardNumber, token);
            yield put(searchListTradingSuccess(resultCall))
        }
        catch {

        }
    }
}
export const tradingSaga = [
    getUserFullName(),
    trading(),
    searchListTradingSaga()
]