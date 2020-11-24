import * as Types from "../actions/type"
const initState = {
    loading: false,
    tradingSuccess: false,
    nameCheck: "",
    errorCheck: "",
    listTrading: []
}
const tradingReducer = (state = initState, action) => {
    switch (action.type) {
        case (Types.CHECK_CARD_NUMBER): {
            return { ...state, loading: true, nameCheck: "" }
        }
        case (Types.CHECK_CARD_NUMBER_FAILED): {
            return { ...state, loading: false }
        }
        case (Types.CHECK_CARD_NUMBER_SUCCESS): {
            return { ...state, nameCheck: action.nameCheck, loading: false, errorCheck: "" }
        }
        case (Types.USER_TRADING): {
            return { ...state, loading: true }
        }
        case (Types.TRADING_SUCCESS): {
            return { ...state, loading: false, nameCheck: "" }
        }
        case (Types.TRADING_FAILED): {
            return { ...state, errorCheck: action.errorCheck, loading: false, nameCheck: "" }
        }
        case (Types.SEARCH_LIST_TRADING): {
            return { ...state, loading: true }
        }
        case (Types.SET_LIST_TRADING_EMPTY): {
            return { ...state, listTrading: new Array(), loading: false }
        }
        case (Types.SEARCH_LIST_TRADING_SUCCESS): {
            let arr = new Array();
            action.listTrading.forEach(el => {
                arr.push(el);
            })
            return { ...state, listTrading: [...arr], loading: false }
        }
        default: return state
    }
}
export default tradingReducer