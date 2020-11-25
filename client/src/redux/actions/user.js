import * as Types from "./type"
export const getUserInfo = () => {
    return {
        type: Types.GET_USER_INFO,
    }
}
export const getUserInfoSuccess = (userInfo) => {
    return {
        type: Types.GET_USER_INFO_SUCCESS,
        userInfo: userInfo
    }
}
export const getUserInfoFailed = (error) => {
    return {
        type: Types.GET_USER_INFO_FAILED,
        error: error
    }
}
export const getAdminInfo = () => {
    return {
        type: Types.GET_ADMIN_INFO
    }
}
export const getAdminInfoSuccess = (result) => {
    return {
        type: Types.GET_ADMIN_INFO_SUCCESS,
        result: result
    }
}