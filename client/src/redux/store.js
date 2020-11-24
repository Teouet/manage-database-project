import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducer";
import { logger } from "redux-logger"
import rootSaga from "./sagas";

export default function configStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware,logger));
    sagaMiddleware.run(rootSaga);
    return store;
}