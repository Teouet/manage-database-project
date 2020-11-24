import { CircularProgress } from "@material-ui/core";
import React from "react";
const Modal = (props) => {
    return (
        <div>
            <Backdrop click={props.click} show={props.show}></Backdrop>
            <div
                className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? "1" : "0"
                }}>
                <CircularProgress size={100} style={{ position: "fixed", top: "46%", left: "48%" }}></CircularProgress>

            </div>
        </div>
    )
}
const Backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.click}></div> : null
);
export default Modal