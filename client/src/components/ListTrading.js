import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
const useStyles = makeStyles({
    centerContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    border: {
        borderRight: "1px solid #000",
        padding: "18px 0px"
    }
})
const ListTrading = ({ tradingReducer }) => {
    const classes = useStyles()
    return (
        <Grid container spacing={3} style={{ oveflow: "scroll", margin: "40px 0", maxWidth: "1000px" }}>
            <Grid item xs={12} style={{ border: "1px solid #000" }}>
                <Grid container style={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid item xs={4} className={classes.centerContent} >
                        <div >Số giao dịch</div>
                    </Grid>
                    <div className={classes.border}></div>
                    <Grid item xs={2} className={classes.centerContent}>
                        <div >Số tiền</div>
                    </Grid>
                    <div className={classes.border}></div>
                    <Grid item xs={5} className={classes.centerContent}>
                        <div >Chú thích</div>
                    </Grid>
                    {/* <div style={{ borderRight: "1px solid #000", padding: "12px 0px" }}></div> */}
                </Grid>
            </Grid>
            {tradingReducer.listTrading.map(el => {
                return <TradingItem trading={el} key={el.id}></TradingItem>
            })}
        </Grid>
    )
}
const TradingItem = ({ trading }) => {
    const classes = useStyles()
    console.log("xxx", trading.id, trading)
    return (
        <Grid item xs={12} style={{ border: "1px solid #000" }}>
            <Grid container style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid item xs={4} className={classes.centerContent}>
                    <div >{trading.id}</div>
                </Grid>
                <div className={classes.border}></div>
                <Grid item xs={2} className={classes.centerContent} >
                    <div >{trading.money}</div>
                </Grid>
                <div className={classes.border}></div>
                <Grid item xs={5} className={classes.centerContent}>
                    <div >{trading.note}</div>
                </Grid>
            </Grid>
        </Grid>
    )

}
const mapStateToProps = (state) => {
    return {
        tradingReducer: state.tradingReducer
    }
}
export default connect(mapStateToProps, null)(ListTrading)