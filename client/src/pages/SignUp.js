import React, { useState } from 'react';
import axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import '../resources/scss/auth.css'
import { TextField, makeStyles, InputAdornment, IconButton, Checkbox, FormControlLabel, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
const useStyle = makeStyles({
    textField: {
        marginRight: "16px",
        width: "calc((100% - 16px)/2)"
    },
    buttonGoogle: {
        border: "1px solid #908e8e",
        marginBottom: "8px"
    }
})
const SignUp = () => {
    const classes = useStyle();
    const [checkBox, setCheckBox] = useState(false)
    const history = useHistory();
    const [showPass, setShowPass] = useState(false);
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: ""
    })
    const [error, setError] = useState({
        errorMessage: "",
        type: ""
    })
    console.log("xxxxx ", input.username)
    const checkInput = () => {
        let isError = false;
        let regex = /[^A-z ]/g;
        if (input.firstName.match(regex)) {
            isError = true;
            return setError(
                {
                    errorMessage: "Họ không được có chữ số và kí tự đặc biệt ",
                    type: "firstName"
                }
            )
        } else {
            if (input.firstName.length < 2) {
                isError = true;
                return setError(
                    {
                        errorMessage: "Họ không được trống",
                        type: "firstName"
                    }
                )
            }

        }
        if (input.lastName.match(regex)) {
            isError = true;
            return setError({
                errorMessage: "Tên không được có chữ số và kí tự đặc biệt",
                type: "lastName"
            })
        } else {
            if (input.lastName.length === 0) {
                isError = true;
                return setError({
                    errorMessage: "Tên không được trống",
                    type: "lastName"
                })
            }
        }
        if (input.username.length < 6) {
            isError = true;
            return setError({
                errorMessage: "Tên đăng nhập phải có ít nhất 6 ký tự",
                type: "username"
            })
        }
        if (input.password.length < 8) {
            isError = true;
            return setError({
                errorMessage: "Mật khẩu phải có ít nhất 8 kí tự",
                type: "password"
            })
        }
        if (checkBox === false) {
            isError = true;
            return setError({
                errorMessage: "Bạn phải đồng ý với các chính sách",
                type: "checkBox"
            })
        }
        if (!isError) {
            setError({
                errorMessage: "",
                type: ""
            })
        }
        handleResign()
    }
    const handleOnChangeInput = (event, field) => {
        setInput({
            ...input,
            [field]: event.target.value
        })
        setError({
            errorMessage: "",
            type: ""
        })
    }
    const handleResign = () => {
        return axios.post("http://localhost:8003/api/user", input)
            .then((res) => {
                console.log("xxxxx status", res)
                if (res.status === 200) {
                    history.push("/sign-in");
                } else {
                    if (res.status === 205) {
                        setError({
                            errorMessage: "Đã có tài khoản",
                            type: "haveUser"
                        })
                    }
                }
            })
            .catch((error) => console.log(error))

    }
    const handleClickShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="root-sign-up">
            <div className="circle">
                <LockOutlinedIcon className="lock-icon"></LockOutlinedIcon>
            </div>
            <h1 style={{ marginTop: "8px", fontSize: "24px", fontWeight: 400, color: "" }}>Sign Up</h1>

            <div style={{ marginBottom: "24px", display: "flex", width: "100%" }}>

                <TextField
                    variant="outlined"
                    label="Họ"
                    type="text"
                    className={classes.textField}
                    onChange={(event) => handleOnChangeInput(event, "firstName")}
                    error={error.type === "firstName" ? true : false}
                />
                <TextField
                    variant="outlined"
                    label="Tên"
                    type="text"
                    style={{ width: "calc((100% - 16px)/2)" }}
                    onChange={(event) => handleOnChangeInput(event, "lastName")}
                    error={error.type === "lastName" ? true : false}
                />
            </div>
            <TextField
                variant="outlined"
                fullWidth={true}
                label="Tên đăng nhập"
                type="username"
                style={{ marginBottom: "24px" }}
                onChange={(event) => handleOnChangeInput(event, "username")}
                error={error.type === "username" ? true : false}
            />
            <TextField
                variant="outlined"
                fullWidth={true}
                label="Mật Khẩu"
                type={showPass ? "text" : "password"}
                style={{ marginBottom: "16px" }}
                onChange={(event) => handleOnChangeInput(event, "password")}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleClickShowPass()}>
                                {showPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                error={error.type === "password" ? true : false}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        value={checkBox}
                        color="primary"
                        onChange={() => setCheckBox(!checkBox)}
                    />
                }
                label="Tôi đã đọc và đồng ý với các chính sách"
                style={{ marginRight: "auto", marginBottom: "8px" }}
            />
            { error.type.length > 0 ? <Alert severity="error" style={{ marginBottom: "16px", marginRight: "auto", width: "100%" }}>{error.errorMessage}</Alert> : null}
            <Button fullWidth={true} variant="contained" color="primary" style={{ marginBottom: "16px" }} onClick={() => checkInput()}>SIGN UP</Button>
            <a href="/sign-in" style={{ marginLeft: "auto", color: "#1976d2", cursor: "pointer", textDecoration: "none" }}>Đã có tài khoản? Đăng nhập</a>
        </div >
    )
}
export default SignUp