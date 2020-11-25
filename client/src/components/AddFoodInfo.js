import { Button, Card, CardActionArea, CardContent, CardMedia, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios"
import addFile from "../resources/images/add-file.svg"
const useStyle = makeStyles({
    textField: {
        marginBottom: "16px"
    },
    input: {
        display: "none"
    }
})
const AddFoodInfo = () => {
    const classes = useStyle()
    const [url, setUrl] = useState(null)
    const [input, setInput] = useState({
        name: "",
        description: "",
        price: 0,
        image: null
    })
    console.log("xxxx  ", url, "xxxxnfsd", input.image)
    const handleSubmit = (event) => {
        event.preventDefault();
        let form = new FormData();
        for (let item in input) {
            form.append(`${item}`, input[item])
        }
        axios.post("http://localhost:8003/api/food/add-food", form, {
            "headers": {
                "Content-type": 'multipart/form-data'
            }
        }).then(res => setInput({
            name: "",
            description: "",
            price: 0,
            image: null
        }))
    }
    const handleOnChangeInput = (event, field) => {
        setInput({
            ...input,
            [field]: event.target.value
        })
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "500px" }}>
            <form encType="multipart/form-data" style={{ width: "90%" }} onSubmit={(event) => handleSubmit(event)}>
                <div style={{ fontSize: "36px", marginBottom: "16px", textAlign: "center" }}>Thêm đồ ăn</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                        variant="outlined"
                        label="Tên"
                        type="text"
                        fullWidth={true}
                        value={input.name}
                        className={classes.textField}
                        onChange={(event) => handleOnChangeInput(event, "name")}
                    // error={error.type === "firstName" ? true : false}
                    />
                    <TextField
                        variant="outlined"
                        label="Miêu tả"
                        type="text"
                        className={classes.textField}
                        multiline={true}
                        rows={10}
                        value={input.description}
                        onChange={(event) => handleOnChangeInput(event, "description")}
                    // error={error.type === "firstName" ? true : false}
                    />
                    <TextField
                        variant="outlined"
                        label="Giá"
                        type="number"
                        value={input.price}
                        className={classes.textField}
                        onChange={(event) => handleOnChangeInput(event, "price")}
                    // error={error.type === "firstName" ? true : false}
                    />
                </div>

                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={(event) => {
                        return setInput({ ...input, image: event.target.files[0] })
                    }}
                />
                <Card >
                    <CardActionArea>
                        <div style={{ fontSize: "16px", padding: "12px", borderBottom: "1px solid #0000001f" }}>Tải ảnh lên</div>
                        <label htmlFor="contained-button-file">
                            <CardMedia style={{ padding: "20px", maxWidth: "90%", marginLeft: "auto", marginRight: "auto", boxSizing: "border-box" }} >
                                <div style={{ display: "flex", border: "1px dashed #0000001f", padding: "20px" }}>
                                    <img src={addFile} height="100px" alt="add-food-icon"></img>
                                    <div >
                                        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Chọn ảnh</div>
                                        <div>Thả ảnh vào đây hoặc là ấn vào đây để chọn ảnh từ máy của bạn</div>
                                    </div>
                                </div>

                            </CardMedia>
                        </label>
                        {input.image ? <div style={{ margin: "20px 40px" }}>{input.image.name}</div> : null}
                    </CardActionArea>

                </Card>
                <Button type="submit" style={{ marginBottom: "100px", marginLeft: "auto", marginRight: "auto", display: "flex", marginTop: "20px" }} variant="contained" color="primary" >Submit</Button>
            </form>

        </div >
    )
}
export default AddFoodInfo