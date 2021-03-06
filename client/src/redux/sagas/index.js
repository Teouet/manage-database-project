import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { foodSaga } from "./food";
import { tradingSaga } from "./trading";
import { userSaga } from "./user";

export default function* rootSaga() {
    yield all([
        ...authSaga,
        ...userSaga,
        ...tradingSaga,
        ...foodSaga
    ]);
}