import * as Types from "../actions/type";
const initState = {
    loading: false,
    adminInfo: {}
}
const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case (Types.GET_ADMIN_INFO): {
            return { ...state, loading: true }
        }
        case (Types.GET_ADMIN_INFO_SUCCESS): {
            let copyResult = { ...action.result }
            copyResult["User"] = copyResult.user12Month;
            copyResult["Trading"] = copyResult.trading12Month
            copyResult["Money"] = copyResult.money12Month
            return { ...state, loading: false, adminInfo: { ...copyResult } }
        }
        default: return state
    }
}
export default adminReducer