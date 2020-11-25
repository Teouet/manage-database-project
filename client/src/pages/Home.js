import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import HistoryIcon from '@material-ui/icons/History';
import ControlTable from '../components/ControlTable';
import { Route, Switch, useHistory } from 'react-router';
import Trading from '../components/Trading';
import { getUserInfo } from '../redux/actions/user';
import { connect } from 'react-redux';
import { addString, convertCardNumber } from '../utils';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HistoryTrading from '../components/HistoryTrading';
import Modal from '../components/Modal';
import ListFood from '../components/ListFood';
import AddFoodInfo from '../components/AddFoodInfo';
import Statistic from '../components/Statistic';
import StatisticUser from '../components/StatisticUser';
const useStyles = makeStyles({
    mainLeft: {
        width: "270px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "calc(100% -64px)"
    },
    mainRight: {
        width: "calc(100% - 270px)",
        backgroundColor: "#f4f6f8",
        minHeight: "100%",
        paddingTop: "24px",
        paddingBottom: "24px",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        height: "100%",
        overflow: "scroll"
    },
    avatar: {
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        backgroundColor: "orange",
        margin: "16px auto 16px auto",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        color: "#fff",
        display: "flex"
    },
    info: {
        marginRight: "auto",
        marginLeft: "auto",
        fontSize: "16px",
        fontWeight: 500
    }
})
const Home = ({ getUserInfo = () => { }, userState }) => {
    console.log("xxxx", userState)
    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])
    const classes = useStyles();
    const history = useHistory();
    let cardNumber = userState.infoUser.cardNumber ? userState.infoUser.cardNumber : ""
    if (userState.loading) {
        return (
            <Modal show={userState.loading}></Modal>
        )
    }
    return (
        <div style={{ height: "100%" }}>
            <ControlTable fullName={userState.infoUser.fullName}></ControlTable>
            {userState.infoUser.typeAccount === 1 ? (<Grid container style={{ height: "calc(100% - 64px)", overflow: "hidden" }} >
                <Grid item xs={2} className={classes.mainLeft}>
                    <div>
                        <div className={classes.avatar}>
                            <span style={{ justifyContent: "center", alignItems: "center" }}>M</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span className={classes.info}>{userState.infoUser.fullName}</span>
                            <span className={classes.info} style={{ marginTop: "8px" }}>Số tài khoản : {convertCardNumber(cardNumber)}</span>
                            <span className={classes.info} style={{ marginTop: "8px" }}>Số dư : {userState.infoUser ? addString((userState.infoUser.money.toFixed(3) * 1000).toString()) : -1}</span>


                        </div>
                        <Divider style={{ height: "1px" }}></Divider>
                    </div>
                    <div style={{ padding: "16px" }}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Giao Dịch
                                </ListSubheader>
                            }
                        >
                            <ListItem button onClick={() => {
                                history.push("/home/trading")
                            }} >
                                <ListItemIcon>
                                    <CreditCardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Chuyển tiền" />
                            </ListItem>
                            <List component="div" disablePadding>
                                <ListItem button onClick={() => history.push("/home/history-trading")} >
                                    <ListItemIcon>
                                        <HistoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Lịch sử giao dịch" />
                                </ListItem>
                            </List>
                        </List>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Mua Đồ
                                </ListSubheader>
                            }
                        >
                            <ListItem button onClick={() => history.push("/home/order-food")}>
                                <ListItemIcon>
                                    <FastfoodIcon></FastfoodIcon>
                                </ListItemIcon>
                                <ListItemText primary="Đặt đồ ăn" />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
                <Grid item xs={10} className={classes.mainRight}>
                    <Switch>
                        <Route exact path="/home">
                            <StatisticUser target={userState.infoUser.target} moneyTrading={userState.infoUser.moneyTrading} moneyFood={userState.infoUser.moneyFood}></StatisticUser>
                        </Route>
                        <Route exact path={"/home/trading"}>
                            <Trading cardNumber={userState.infoUser.cardNumber} money={userState.infoUser.money}></Trading>
                        </Route>
                        <Route exact path={"/home/history-trading"}>
                            <HistoryTrading />
                        </Route>
                        <Route exact path="/home/order-food">
                            <ListFood typeAccount={userState.infoUser.typeAccount} money={userState.infoUser.money}></ListFood>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>) : (
                    <Grid container style={{ height: "calc(100% - 64px)", overflow: "hidden" }} >
                        <Grid item xs={2} className={classes.mainLeft}>
                            <div>
                                <div className={classes.avatar}>
                                    <span style={{ justifyContent: "center", alignItems: "center" }}>M</span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span className={classes.info}>{userState.infoUser.fullName}</span>
                                </div>
                                <Divider style={{ height: "1px" }}></Divider>
                            </div>
                            <div style={{ padding: "16px" }}>
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Thống kê
                                        </ListSubheader>
                                    }
                                >
                                    <ListItem button onClick={() => history.push("/home")}>
                                        <ListItemIcon>
                                            <FastfoodIcon></FastfoodIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Thống kê" />
                                    </ListItem>
                                </List>
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            Thêm đồ ăn
                                        </ListSubheader>
                                    }
                                >
                                    <ListItem button onClick={() => history.push("/home/add-food")}>
                                        <ListItemIcon>
                                            <FastfoodIcon></FastfoodIcon>
                                        </ListItemIcon>
                                        <ListItemText primary="Thêm Đồ ăn" />
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={10} className={classes.mainRight}>
                            <Switch>
                                <Route exact path="/home">
                                    <Statistic typeAccount={userState.infoUser.typeAccount}></Statistic>
                                </Route>
                                <Route exact path={"/home/add-food"}>
                                    <ListFood typeAccount={userState.infoUser.typeAccount}></ListFood>
                                </Route>
                                <Route exact path="/home/add-food/info">
                                    <AddFoodInfo />
                                </Route>
                                <Route exact path="/home/statistical">
                                </Route>
                            </Switch>
                        </Grid>
                    </Grid>
                )}
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        userState: state.userReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(getUserInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)