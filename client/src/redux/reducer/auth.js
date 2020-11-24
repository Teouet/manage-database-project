import * as Types from "../actions/type"
const initState = {
    isLogin: false,
    loading: false,
    error: null,
    isLoaded: false
}
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.CHECK_IS_LOG_IN: {
            return { ...state, loading: true }
        }
        case Types.SET_IS_AUTH: {
            return { ...state, isLogin: action.isAuth, loading: false, error: null, isLoaded : true }
        }
        default: return state
    }
}
export default authReducer