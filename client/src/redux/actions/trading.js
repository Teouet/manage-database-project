import * as Types from "./type";
export const checkCardNumber = (cardNumber) => {
    return {
        type: Types.CHECK_CARD_NUMBER,
        cardNumber: cardNumber
    }
}
export const checkCardNumberSuccess = (nameCheck) => {
    return {
        type: Types.CHECK_CARD_NUMBER_SUCCESS,
        nameCheck: nameCheck
    }
}
export const checkCardNumberFailed = () => {
    return {
        type: Types.CHECK_CARD_NUMBER_FAILED
    }
}
export const userTrading = (cardNumber, money, note) => {
    return {
        type: Types.USER_TRADING,
        cardNumber: cardNumber,
        money: money,
        note: note
    }
}
export const tradingSuccess = () => {
    return {
        type: Types.TRADING_SUCCESS,
    }
}
export const tradingFailed = (error) => {
    return {
        type: Types.TRADING_FAILED,
        errorCheck: error
    }
}
export const searchListTrading = (dateFrom, dateEnd) => {
    return {
        type: Types.SEARCH_LIST_TRADING,
        dateFrom: dateFrom,
        dateEnd: dateEnd,
    }
}
export const setListTradingEmpty = () => {
    return {
        type: Types.SET_LIST_TRADING_EMPTY,
    }
}
export const searchListTradingSuccess = (listTrading) => {
    return {
        type: Types.SEARCH_LIST_TRADING_SUCCESS,
        listTrading: listTrading
    }
}