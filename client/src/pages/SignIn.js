import React, { useState } from 'react';
import axios from "axios";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import '../resources/scss/auth.css'
import { TextField, makeStyles, InputAdornment, IconButton, Button } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { checkIsLogIn } from '../redux/actions/auth';
const useStyle = makeStyles({
    textField: {
        marginRight: "16px",
        width: "calc((100% - 16px)/2)"
    },
    buttonWithoutHover: {
        marginLeft: "auto",
        color: "#1976d2",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "transparent"
        }
    }
})
const SignIn = ({ checkIsLogIn }) => {
    const classes = useStyle();
    const history = useHistory();
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState({
        errorMessage: "",
        type: ""
    })
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const [errorLogin, setErrorLogin] = useState(false);
    const checkInput = () => {
        let isError = false;

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
        if (!isError) {
            setError({
                errorMessage: "",
                type: ""
            })
        }
        handleSignIn()
    }
    const handleOnChangeInput = (event, field) => {
        setInput({
            ...input,
            [field]: event.target.value
        })
    }
    const handleSignIn = () => {
        return axios.post("http://localhost:8002/api/user/log-in", input, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem("_user", res.data);
                    checkIsLogIn(true)
                    history.push("/home");
                }
            })
            .catch(err => {
                setErrorLogin(true)
            })
    }
    const handleClickShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="root-sign-in">
            <div className="circle">
                <LockOutlinedIcon className="lock-icon"></LockOutlinedIcon>
            </div>
            <h1 style={{ marginTop: "8px", fontSize: "24px", fontWeight: 400 }}>Sign In</h1>
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
            {error.type.length > 0 ? <Alert severity="error" style={{ marginBottom: "16px", marginRight: "auto", width: "100%" }}>{error.errorMessage}</Alert> : null}
            {errorLogin ? <Alert severity="error" style={{ marginBottom: "16px", marginRight: "auto", width: "100%" }} >Tên đăng nhập hoặc mật khẩu sai</Alert> : null}
            <Button fullWidth={true} variant="contained" color="primary" style={{ marginBottom: "16px" }} onClick={() => checkInput()}>SIGN IN</Button>
            <Button href="/sign-up" disableRipple={true} className={classes.buttonWithoutHover} type="text">Chưa có tài khoản? Đăng ký ngay</Button>
        </div>
    )
}
const mapDispatchToProps = (dispatch) => ({
    checkIsLogIn: () => dispatch(checkIsLogIn())
})
export default connect(null, mapDispatchToProps)(SignIn)