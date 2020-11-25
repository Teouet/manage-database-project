import { Button, Grid, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Pie } from 'react-chartjs-2';
import { useHistory } from "react-router";
import { callApi } from "../axios";
import { addString, convertNumber } from "../utils";

const StatisticUser = ({ target, moneyTrading, moneyFood }) => {
    const [money, setMoney] = useState("");
    console.log("xxxx ", target - moneyFood - moneyTrading)
    const history = useHistory()
    const data = {
        labels: ['Chuyển tiền', 'Đồ ăn'],
        datasets: [
            {
                label: '# of Votes',
                data: [moneyTrading, moneyFood],
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
    const handleOnChangeMoney = (string) => {
        let number = convertNumber(string);
        let regExp = /[^0-9]/g;
        let temp = number.match(regExp);
        if (!temp) {
            return setMoney(addString(number));
        }
    };
    const handleSaveTarget = async () => {
        await callApi({ url: "/api/user/set-target", checkAuth: true, token: localStorage.getItem("_user"), data: { target: parseInt(convertNumber(money)) } })
        window.location.reload()
    }
    return (
        <div style={{ width: "100%", padding: "0 32px" }}>
            <Grid container style={{ marginTop: "16px", backgroundColor: "#fff", height: "100%", display: "flex" }} >
                <Grid item xs={12} style={{ marginTop: "24px" }} >
                    <div style={{ fontSize: "24px", textAlign: "center" }}>Thống kê chi tiêu tháng {new Date().getMonth() + 1}</div>
                </Grid>
                <Grid item xs={4} style={{ padding: "20px 0px 40px 0px" }}>
                    <div style={{ fontSize: "24px", textAlign: "center", marginBottom: "14px" }}>Các khoản bạn đã tiêu</div>
                    <Pie data={data} height={150}></Pie>
                </Grid>
                <Grid item xs={8} style={{ display: "flex", paddingTop: "20px", flexDirection: "column", alignItems: "center" }}>
                    {!target ? (
                        <>
                            <div style={{ fontSize: "20px", marginBottom: "16px" }}>Bạn chưa ghi nhớ số tiền</div>
                            <TextField
                                variant="outlined"
                                placeholder="Số tiền"
                                style={{ appearance: "none", width: "400px" }}
                                value={money}
                                onChange={(event) => handleOnChangeMoney(event.target.value)}
                            />
                            <Button variant="contained" color="primary" style={{ marginTop: "16px" }} onClick={() => handleSaveTarget()}>Ghi nhớ</Button>
                        </>)
                        :
                        ((moneyFood + moneyTrading > target) ? ((
                            <>
                                <div style={{ marginBottom: "16px", fontSize: "20px" }}>Số tiền bạn đã tiêu : {addString((moneyTrading * 1000 + moneyFood * 1000).toString())}</div>
                                <div style={{ marginBottom: "16px", fontSize: "20px" }}>Số tiền bạn đề ra : {addString((target * 1000).toString())}</div>
                                <Alert severity="warning">Bạn đã vượt quá số tiền đề ra</Alert>
                                <Button variant="contained" color="primary" style={{ marginTop: "16px" }} onClick={() => history.push("/home/history-trading")} >Xem lịch sử giao dịch</Button>
                            </>)) : (
                                (
                                    <>
                                        <div style={{ marginBottom: "16px", fontSize: "20px" }}>Số tiền bạn đã tiêu : {addString((moneyTrading * 1000 + moneyFood * 1000).toString())}</div>
                                        <div style={{ marginBottom: "16px", fontSize: "20px" }}>Số tiền bạn đề ra : {addString((target * 1000).toString())}</div>
                                        <Alert severity="success">Bạn vẫn còn {addString(Math.round((target - moneyFood - moneyTrading) * 1000).toString())} VND để tiêu</Alert>
                                        <Button variant="contained" color="primary" style={{ marginTop: "16px" }} onClick={() => history.push("/home/order-food")}>Mua đồ ăn</Button>
                                    </>)
                            ))
                    }
                </Grid>
            </Grid>
        </div >
    )
}
export default React.memo(StatisticUser)