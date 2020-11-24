import { Button, makeStyles, Paper, Popover } from '@material-ui/core';
import { AccountBalance } from '@material-ui/icons';
import React from 'react';
import { useHistory } from 'react-router';
const useStyles = makeStyles({
    header: {
        minHeight: "64px",
        padding: "0 24px",
        backgroundColor: "#3949ab",
        display: "flex",
        alignItems: "center"
    },
    logo: {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    rightHeader: {
        marginLeft: "auto"
    },
})
const ControlTable = ({ fullName }) => {
    console.log("xxxx full name ", fullName)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const history = useHistory();
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <AccountBalance style={{ fontSize: "30px" }} color="primary"></AccountBalance>
            </div>
            <div className={classes.rightHeader}>
            </div>
            <div>
                <Button onClick={(event) => handleClick(event)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "orange", marginRight: "8px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span>{fullName ? fullName[0].toUpperCase() : ""}</span>
                        </div>
                        <div style={{ color: "#fff" }}>{fullName ? fullName.toUpperCase() : ""}</div>
                    </div>
                </Button>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <Paper
                        elevation={4}
                        style={{
                            width: "160px",
                            height: "60px",
                            padding: "10px",
                            fontSize: "16px",
                        }}
                    >
                        <Button fullWidth={true} style={{ justifyContent: "start" }} onClick={() => {
                            localStorage.removeItem("_user");
                            history.push("/sign-in");
                            window.location.reload()
                        }}>Log Out</Button>
                    </Paper>
                </Popover>
            </div>

        </header>
    )
}
export default React.memo(ControlTable)