import { call, put, select, take } from 'redux-saga/effects';
import * as Types from "../actions/type";
import { callApi } from "../../axios/index"
import { setIsAuth } from '../actions/action';
import { getAllFoods, getAllFoodSucces, getAllFoodSuccess, saveListFoodSuccess } from '../actions/food';
function getAllFoodApi() {
    return callApi({ url: "/api/food/get-all-food", method: "get" })
}
function saveListFoodApi(listFood) {
    return callApi({ url: "/api/food/save-list-food", data: listFood })
}
function* getAllFoodSaga() {
    while (true) {
        try {
            let action = yield take(Types.GET_ALL_FOOD);
            let temp = yield call(getAllFoodApi);
            if (temp) {
                yield put(getAllFoodSuccess(temp))
            }
        }
        catch (e) {

        }
    }

}
function* saveListFood() {
    while (true) {
        try {
            let action = yield take(Types.SAVE_LIST_FOOD);
            let foodReducer = yield select(state => state.foodReducer);
            let result = yield call(saveListFoodApi, foodReducer.removeFood)
            if (result === "success") {
                yield put(saveListFoodSuccess())
                yield put(getAllFoods())
            }
        }
        catch {

        }
    }
}
export const foodSaga = [
    getAllFoodSaga(),
    saveListFood()
]