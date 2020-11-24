// import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { searchListTrading, setListTradingEmpty } from '../redux/actions/trading';

const MaterialUIPickers = ({ searchListTrading, setListTradingEmpty }) => {
    const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date());
    const [selectedDateEnd, setSelectedDateEnd] = React.useState(new Date());

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="center">
                    <KeyboardDatePicker
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="Từ ngày"
                        value={selectedDateFrom}
                        style={{ marginRight: "40px" }}
                        onChange={(date) => setSelectedDateFrom(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        label="Đến ngày"
                        format="MM/dd/yyyy"
                        value={selectedDateEnd}
                        onChange={(date) => setSelectedDateEnd(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button variant="contained" color="primary" onClick={() => {
                setListTradingEmpty()
                searchListTrading(selectedDateFrom.getTime(), selectedDateEnd.getTime())
            }
            }>Tìm kiếm</Button>
        </div>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchListTrading: (dateFrom, dateEnd) => dispatch(searchListTrading(dateFrom, dateEnd)),
        setListTradingEmpty: () => dispatch(setListTradingEmpty())
    }
}
export default connect(null, mapDispatchToProps)(MaterialUIPickers)