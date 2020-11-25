import { Button, TextField } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { connect } from "react-redux";
import { checkCardNumber, userTrading } from "../redux/actions/trading";
import { addSpaceToTextField, addString, convertNumber } from "../utils";
import Modal from "./Modal";

const Trading = ({ checkCardNumber, tradingReducer, userTrading, money, cardNumber }) => {
    const [input, setInput] = useState({
        cardNumber: "",
        note: "",
        money: "",

    });
    console.log("xx money", cardNumber, "xxx", input.cardNumber)

    const [error, setError] = useState({
        errorMessage: "",
        type: ""
    })
    const handleOnChangeInput = (event, field) => {
        if (field === "cardNumber") {
            if (event.target.value.length <= 19) {
                let tempString = event.target.value.replace(/ /g, "")
                let regExp = /[^0-9]/g;
                let temp = tempString.match(regExp);
                if (!temp) {
                    return setInput({
                        ...input,
                        cardNumber: addSpaceToTextField(tempString)
                    });
                }
            }
        } else {
            setInput({
                ...input,
                [field]: event.target.value
            })
        }

    }
    const handleOnChangeMoney = (string) => {
        let number = convertNumber(string);
        let regExp = /[^0-9]/g;
        let temp = number.match(regExp);
        if (!temp) {
            return setInput({
                ...input,
                money: addString(number)
            });
        }
    };
    const checkInput = (check) => {
        let isError = false;
        let regex = /[^A-z0-9 ]/g;
        if (check) {
            setError({
                errorMessage: "",
                type: ""
            })
            checkCardNumber(input.cardNumber);
        } else {
            if (input.note.match(regex)) {
                isError = true;
                return setError({
                    errorMessage: "Chú thích không được có ký tự đặc biệt ",
                    type: "note"
                })
            }
            if (input.cardNumber.length !== 16) {
                isError = true;
                return setError({
                    errorMessage: "Số tài khoản phải có 16 chữ số và không có khoảng cách",
                    type: "cardNumber"
                })
            }
            if (money < 50) {
                return setError({
                    errorMessage: "So du phai lon hon 50,000 VND",
                    type: "temp"
                })

            }
            if (parseInt(convertNumber(input.money)) / 1000 > (money - 50)) {
                isError = true;
                return setError({
                    errorMessage: "Số tiền lớn hơn số dư",
                    type: "money"
                })
            }
            if (cardNumber === input.cardNumber) {
                return setError({ errorMessage: "Bạn không thể gửi cho chính mình", type: "cardNumber2" })
            }
            if (!isError) {
                setError({
                    errorMessage: "",
                    type: ""
                })
            }
            userTrading(input.cardNumber, convertNumber(input.money) / 1000, input.note)
        }



    }
    return (
        <div>
            {tradingReducer.loading ? <Modal show={tradingReducer.loading}></Modal> : null}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ marginRight: "20px", width: "150px" }}>Số tài khoản :</div>
                <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Số tài khoản"
                    style={{ appearance: "none", width: "400px" }}
                    onChange={(event) => handleOnChangeInput(event, "cardNumber")}
                    error={error.type === "cardNumber" ? true : false}
                    value={input.cardNumber}
                    InputProps={{
                        endAdornment: (
                            <Button style={
                                {
                                    fontSize: "10px",
                                    width: "80px",
                                    fontWeight: "bold"
                                }
                            }
                                onClick={() => {
                                    checkInput(true);
                                }}>Kiểm tra</Button>
                        )
                    }}
                />
            </div>
            {tradingReducer.nameCheck.length > 0 ? <div style={{ color: "red", marginBottom: "16px", marginLeft: "170px" }}>{tradingReducer.nameCheck}</div> : <div></div>}
            {(error.type === "cardNumber2" && input.cardNumber.length === 16) ? <Alert severity="error" style={{ marginBottom: "16px", marginRight: "auto", width: "100%", display: "flex", justifyContent: "center" }}>{error.errorMessage}</Alert> : null}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ marginRight: "20px", width: "150px" }}>Số tiền :</div>
                <TextField
                    variant="outlined"
                    placeholder="Số tiền"
                    style={{ appearance: "none", width: "400px" }}
                    onChange={(event) => handleOnChangeMoney(event.target.value)}
                    value={input.money}
                    error={error.type === "money" ? true : false}
                    InputProps={{
                        endAdornment: (
                            <div style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "bold", marginRight: "10px" }}>VND</div>
                        )
                    }}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ marginRight: "20px", width: "150px" }}>Chú thích :</div>
                <TextField
                    variant="outlined"
                    type="text"
                    placeholder="Chú thích"
                    style={{ appearance: "none", width: "400px" }}
                    onChange={(event) => handleOnChangeInput(event, "note")}
                    error={error.type === "note" ? true : false}

                />
            </div>
            {((error.type.length > 0 && error.type !== "cardNumber2") || tradingReducer.errorCheck.length > 0) ? <Alert severity="error"
                style={{ marginBottom: "16px", marginRight: "auto", width: "100%", display: "flex", justifyContent: "center" }}>{error.errorMessage.length > 0 ? error.errorMessage : tradingReducer.errorCheck}</Alert> : null}
            <Button color="primary" variant="contained" onClick={() => checkInput(false)}>Chuyển tiền</Button>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        tradingReducer: state.tradingReducer
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        checkCardNumber: (cardNumber) => dispatch(checkCardNumber(cardNumber)),
        userTrading: (cardNumber, money, note) => dispatch(userTrading(cardNumber, money, note))
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Trading)