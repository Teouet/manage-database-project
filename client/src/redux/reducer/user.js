import * as Types from "../actions/type";
const initState = {
    infoUser: {},
    loading: false,
    error: null,
    adminInfo: {}
}
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case (Types.GET_USER_INFO): {
            return { ...state, loading: true }
        }
        case (Types.GET_USER_INFO_SUCCESS): {
            return { ...state, infoUser: { ...action.userInfo }, loading: false, error: null }
        }
        case (Types.GET_USER_INFO_FAILED): {
            return { ...state, error: action.error }
        }
        case (Types.GET_ADMIN_INFO): {
            return { ...state, loading: true }
        }
        default: return state
    }
}
export default userReducer