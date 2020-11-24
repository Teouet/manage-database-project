import { combineReducers } from "redux";
import authReducer from "./auth";
import foodReducer from "./food";
import tradingReducer from "./trading";
import userReducer from "./user";

const rootReducer = combineReducers({
    authReducer: authReducer,
    userReducer: userReducer,
    tradingReducer: tradingReducer,
    foodReducer : foodReducer
})
export default rootReducer