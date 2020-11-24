import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { checkIsLogIn } from './redux/actions/action';


const App = ({ checkIsLogIn = () => { }, authReducer }) => {
    useEffect(() => {
        checkIsLogIn();
    }, [checkIsLogIn])
    console.log("xxxxxx isloaded", authReducer.isLoaded, "xxxx is login ", authReducer.isLogin)
    let location = useLocation();
    let tempUrl = location.pathname;
    if (authReducer.isLoaded) {
        if (authReducer.isLogin) {
            if (tempUrl.search("home") !== -1) {
                tempUrl = location.pathname
            } else {
                tempUrl = "/home"
            }
        } else {
            if (tempUrl.search("home") !== -1 || tempUrl === "/") {
                tempUrl = "/sign-in"
            } else {
                tempUrl = location.pathname
            }
        }
    }
    return (
        <>
            {authReducer.isLoaded ? <Redirect to={tempUrl}></Redirect> : null}
            <Switch>
                <Route exact path="/sign-in" component={SignIn} >
                </Route>
                <Route exact path="/sign-up" component={SignUp}>
                </Route>
                <Route path="/home" component={Home}>
                </Route>
            </Switch>
        </>
    );
}
const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
})
const mapDispatchToProps = (dispatch) => ({
    checkIsLogIn: () => dispatch(checkIsLogIn())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
