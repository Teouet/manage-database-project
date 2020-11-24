import { ButtonGroup, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { useHistory } from "react-router";
import { addFoodToCard, deleteFoodInCart, getAllFoods, removeFood, removeFoodInCart, saveListFood, saveListFoodSuccess } from "../redux/actions/food";
import CancelIcon from '@material-ui/icons/Cancel';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import Modal from "./Modal";
import { addString, calculatePrice } from "../utils";
import { userTrading } from "../redux/actions/trading";
import AlertDialogSlide from "./Dialog";
const useStyles = makeStyles({
    root: {
        height: "400px",
    },
});

const ListFood = ({ deleteFoodInCart = () => { }, saveListFood = () => { }, removeFoodInCart = () => { }, getAllFoods = () => { }, foodReducer, typeAccount, removeFood = () => { }, addFoodToCard = () => { }, userTrading }) => {
    console.log("xxxx typeAccount", typeAccount)
    useEffect(() => {
        getAllFoods()
    }, [getAllFoods])
    const classes = useStyles();
    const history = useHistory();
    const [showCart, setShowCart] = useState(false);
    // const [needSave, setNeedSave] = useState(false);
    const countFood = () => {
        let temp = 0;
        for (let item in foodReducer.mapFood) {
            console.log("xxx item", item, "xxx typeof item", typeof item)
            temp += foodReducer.mapFood[item].count
        }
        return temp;
    }
    console.log("xxx temp ", addString(calculatePrice(foodReducer.mapFood).toString()))
    return (
        <>
            {/* {needSave ? <AlertDialogSlide></AlertDialogSlide> : null} */}
            <Modal show={foodReducer.loading}>
            </Modal>
            {!showCart ? (<div style={{ width: "100%" }}>
                {typeAccount === 1 ? <div style={{ position: "relative", cursor: "pointer" }} onClick={() => { if (countFood() > 0) { setShowCart(true) } }} >
                    <ShoppingCartIcon style={{ marginLeft: "auto", marginRight: "50px", fontSize: "48px", display: "block" }} color="primary"></ShoppingCartIcon>
                    <div style={{ position: "absolute", right: "50px", top: "-4px", height: "30px", width: "30px", borderRadius: "50%", backgroundColor: "red" }}>
                        <div style={{ color: "#fff", display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>{countFood()}</div>
                    </div>
                </div> : null}
                <Grid container spacing={3} style={{ display: "flex", width: "100%", margin: "0", justifyContent: "flex-start", padding: "12px 36px" }}>
                    {foodReducer.listFood.length > 0 ? foodReducer.listFood.map(el => {
                        console.log("xxxx el.id", el.id)
                        if (foodReducer.removeFood.indexOf(el.id) === -1) {
                            return (
                                <FoodItem typeAccount={typeAccount} key={el.id} foodItem={el} removeFood={() => removeFood(el.id)} addFoodToCard={(id) => addFoodToCard(id)} ></FoodItem>
                            )
                        }
                    }) : null}
                    {typeAccount === 2 ? <Grid item xs={4}>
                        <Card className={classes.root} onClick={() => {
                            history.push("/home/add-food/info")
                        }}>
                            <CardActionArea style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <AddCircleIcon style={{ fontSize: "60px" }} color="primary"></AddCircleIcon>
                            </CardActionArea>
                        </Card>
                    </Grid> : null}
                </Grid>
                {typeAccount === 2 ? <div style={{ display: "flex" }}>
                    <Button color="primary" variant="contained" style={{ marginLeft: "auto", marginRight: "auto" }} onClick={() => saveListFood()}>Save</Button>
                </div> : null}
            </div>) :
                (
                    <div style={{ height: "100%", width: "100%" }}>
                        <ArrowBackIcon style={{ fontSize: "30px", marginLeft: "24px", marginBottom: "16px", cursor: "pointer" }} color="primary" onClick={() => setShowCart(false)}></ArrowBackIcon>
                        <Grid container spacing={3} style={{ display: "flex", width: "100%", margin: "0", justifyContent: "flex-start", padding: "12px 36px" }}>

                            {calculatePrice(foodReducer.mapFood) === 0 ? <div style={{ marginLeft: "auto", marginRight: "auto", fontSize: "24px" }}>Bạn chưa chọn đồ</div> :
                                (
                                    <>
                                        {foodReducer.listFood.length > 0 ? foodReducer.listFood.map(el => {
                                            if (foodReducer.mapFood[el.id].count > 0) {
                                                return <FoodItemInCard key={el.id}
                                                    count={foodReducer.mapFood[el.id].count}
                                                    addFoodToCard={() => addFoodToCard(el.id)}
                                                    foodItem={el}
                                                    removeFoodInCart={() => removeFoodInCart(el.id)}
                                                    deleteFoodInCart={() => deleteFoodInCart(el.id)}
                                                >
                                                </FoodItemInCard>
                                            }
                                        }) : null}
                                        <Grid item xs={3} style={{ backgroundColor: "#fff", marginLeft: "24px", height: "224px" }} >
                                            <div>Số tiền : {addString(calculatePrice(foodReducer.mapFood).toString())}</div>
                                            <Button color="primary" variant="contained" onClick={() => userTrading(calculatePrice(foodReducer.mapFood))}>Thanh toán</Button>
                                        </Grid>
                                    </>)
                            }
                        </Grid>
                    </div>
                )
            }
        </>
    )
}
const FoodItemInCard = ({ count, addFoodToCard, foodItem, removeFoodInCart, deleteFoodInCart }) => {
    return (
        <Grid item xs={8} style={{ backgroundColor: "#fff", display: "flex", marginBottom: "40px" }}>
            {/* <Card style={{ display: "flex" }}> */}
            <div style={{ maxWidth: "80%", display: "flex", alignItems: "center" }}>
                <img src={"http://localhost:8002/api/food" + foodItem.imageUrl} height="200px" />
                <div style={{ marginLeft: "20px" }}>
                    <div >{foodItem.name}</div>
                    <div style={{ marginTop: "16px" }}>{foodItem.description}</div>
                    <Button style={{ marginTop: "16px" }} color="primary" onClick={() => deleteFoodInCart()}>Xoá</Button>
                </div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "40px", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <div>Giá : {foodItem.price}</div>
                <div style={{ dispaly: "flex" }}>
                    <ButtonGroup>
                        <Button onClick={() => addFoodToCard()}>+</Button>
                        <Button disabled>{count}</Button>
                        <Button onClick={() => removeFoodInCart()}>-</Button>
                    </ButtonGroup>
                </div>
            </div>
            {/* </Card> */}
        </Grid>
    )
}
const FoodItem = ({ foodItem, removeFood, typeAccount, addFoodToCard }) => {
    const classes = useStyles();
    return (
        <Grid item xs={4}>
            <Card className={classes.root} style={{ position: "relative" }}>
                <div style={{ padding: "20px" }}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={"http://localhost:8002/api/food" + foodItem.imageUrl}
                        title="Contemplative Reptile"
                    />
                    <CardContent style={{ height: "130px" }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {foodItem.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {foodItem.description}
                        </Typography>
                    </CardContent>
                </div>
                {typeAccount === 1 ? <CardActions >
                    <Button color="primary" style={{ marginLeft: "auto" }} onClick={() => addFoodToCard(foodItem.id)} >
                        Thêm vào giỏ hàng
                    </Button>
                </CardActions> : <CancelIcon style={
                    {
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        color: "red",
                        cursor: "pointer"
                    }
                }
                    onClick={() => removeFood()}></CancelIcon>}
            </Card>
        </Grid>

    );
}
const mapStateToProps = (state) => {
    return {
        foodReducer: state.foodReducer
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        getAllFoods: () => dispatch(getAllFoods()),
        removeFood: (id) => dispatch(removeFood(id)),
        addFoodToCard: (id) => dispatch(addFoodToCard(id)),
        userTrading: (money) => dispatch(userTrading("9701123426120003", money / 1000, "buy food")),
        removeFoodInCart: (id) => dispatch(removeFoodInCart(id)),
        saveListFood: () => dispatch(saveListFood()),
        deleteFoodInCart: (id) => dispatch(deleteFoodInCart(id))
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(ListFood)