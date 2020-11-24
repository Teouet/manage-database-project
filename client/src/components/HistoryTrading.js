import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setListTradingEmpty } from "../redux/actions/trading";
import MaterialUIPickers from "./DatePicker";
import ListTrading from "./ListTrading";
import Modal from "./Modal";

const HistoryTrading = ({ tradingReducer, setListTradingEmpty }) => {
    useEffect(() => {
        setListTradingEmpty()
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Modal show={tradingReducer.loading}>
            </Modal>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>Xem lịch sử giao dịch</div>
            <MaterialUIPickers></MaterialUIPickers>
            {tradingReducer.listTrading.length > 0 ? <ListTrading></ListTrading> : null}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        tradingReducer: state.tradingReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setListTradingEmpty: () => dispatch(setListTradingEmpty())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HistoryTrading)