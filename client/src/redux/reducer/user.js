import * as Types from "../actions/type";
const initState = {
    infoUser: {},
    loading: false,
    error: null,
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
        default: return state
    }
}
export default userReducer