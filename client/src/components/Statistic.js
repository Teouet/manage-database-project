import { FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import CachedIcon from '@material-ui/icons/Cached';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Pie, Bar } from 'react-chartjs-2';
import { connect } from "react-redux";
import { getAdminInfo } from "../redux/actions/user";
import Modal from "./Modal";
import { addString } from "../utils";

const Statistic = ({ getAdminInfo = () => { }, adminReducer, typeAccount }) => {
    useEffect(() => {
        if (typeAccount === 2) {
            getAdminInfo()
        }
    }, [getAdminInfo, typeAccount])
    let month = new Date().getMonth();
    const [chart, setChart] = useState("Trading")
    const data = {
        labels: ['Phí', 'Đồ ăn'],
        datasets: [
            {
                label: '# of Votes',
                data: [adminReducer.adminInfo.moneyTrading, adminReducer.adminInfo.moneyFood],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
    const data2 = {
        labels: ['1', '2', '3', '4', '5', '6', "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                label: chart,
                data: adminReducer.adminInfo[chart],
                backgroundColor: 'rgb(255, 99, 132)',
            },
        ],
    }
    return (
        <div style={{ width: "100%", padding: "0 32px" }}>
            <Modal show={adminReducer.loading}>
            </Modal>
            <Grid container spacing={3} style={{ display: "flex", justifyContent: "space-between", width: "100%", margin: "0px" }}>
                <Grid item xs={3} style={{ backgroundColor: "#fff", padding: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <AccountBalanceWalletOutlinedIcon style={{ marginLeft: "16px", color: "green", fontSize: "50px" }}></AccountBalanceWalletOutlinedIcon>
                        <div >
                            <div>Nhận được</div>
                            <div style={{ fontWeight: 600, marginTop: "8px" }}>{adminReducer.adminInfo.moneyTrading ? addString((adminReducer.adminInfo.moneyTrading + adminReducer.adminInfo.moneyFood).toString()) : -1} VND</div>
                        </div>
                    </div>
                    <div style={{ padding: "8px" }}>
                        <hr></hr>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                            <CachedIcon style={{ color: "#a9a9a9" }}></CachedIcon>
                            <div style={{ marginLeft: "4px", color: "#a9a9a9" }}>Hiện tại</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} style={{ backgroundColor: "#fff", padding: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <SwapHorizIcon style={{ marginLeft: "16px", color: "orange", fontSize: "50px" }}></SwapHorizIcon>
                        <div >
                            <div>Số giao dịch</div>
                            <div style={{ fontWeight: 600, marginTop: "8px" }}>{adminReducer.adminInfo.trading12Month ? adminReducer.adminInfo.trading12Month[month] : -1}</div>
                        </div>
                    </div>
                    <div style={{ padding: "8px" }}>
                        <hr></hr>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                            <TodayOutlinedIcon style={{ color: "#a9a9a9" }}></TodayOutlinedIcon>
                            <div style={{ marginLeft: "4px", color: "#a9a9a9" }}>Tháng gần nhất</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3} style={{ backgroundColor: "#fff", padding: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <PersonAddIcon style={{ marginLeft: "16px", color: "#23ccef", fontSize: "50px" }}></PersonAddIcon>
                        <div >
                            <div>Số người đăng ký</div>
                            <div style={{ fontWeight: 600, marginTop: "8px", marginLeft: "auto" }}>{adminReducer.adminInfo.user12Month ? adminReducer.adminInfo.user12Month[month] : -1}</div>
                        </div>
                    </div>
                    <div style={{ padding: "8px" }}>
                        <hr></hr>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                            <TodayOutlinedIcon style={{ color: "#a9a9a9" }}></TodayOutlinedIcon>
                            <div style={{ marginLeft: "4px", color: "#a9a9a9" }}>Tháng gần nhất</div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid container style={{ marginTop: "24px" }} >
                <Grid item xs={3} style={{ backgroundColor: "#fff", padding: "20px 0px 40px 0px", marginTop: "40px", maxHeight: "300px" }}>
                    <div style={{ fontSize: "24px", textAlign: "center", marginBottom: "14px" }}>Các nguồn tiền</div>
                    <Pie data={data} height={150}></Pie>
                </Grid>
                <Grid item xs={8} style={{ marginLeft: "16px" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ textAlign: "center", fontSize: "24px" }}>Số tiền thu được 12 tháng gần nhất</div>
                        <FormControl variant="outlined" style={{ marginLeft: "auto", minWidth: "120px" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Biểu đồ</InputLabel>
                            <Select
                                value={chart}
                                onChange={(event) => setChart(event.target.value)}
                                label="Biểu đồ"
                            >
                                <MenuItem value="Trading">Trading</MenuItem>
                                <MenuItem value="Money">Money</MenuItem>
                                <MenuItem value="User">User</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Bar data={data2} height={130}></Bar>
                </Grid>
            </Grid>
        </div >
    )
}
const mapStateToProps = (state) => {
    return {
        adminReducer: state.adminReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAdminInfo: () => dispatch(getAdminInfo())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Statistic)