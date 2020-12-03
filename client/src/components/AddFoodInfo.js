import { Button, Card, CardActionArea, CardContent, CardMedia, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
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
    const [typeAdd, setTypeAdd] = useState("single");

    const [input, setInput] = useState({
        name: "",
        description: "",
        price: 0,
        image: null,
        excel: null
    })
    console.log("xxxx  ", url, "xxxxnfsd", input)
    const handleSubmit = (event) => {
        event.preventDefault();
        let form = new FormData();
        for (let item in input) {
            if (typeAdd === "single") {
                if (item !== "excel") {
                    form.append(`${item}`, input[item])
                }
            } else {
                if (item === "image") {
                    input[item].forEach((el, index) => {
                        form.append(item, el)
                    })
                }
                if (item === "excel") {
                    form.append("excel", input[item])
                }
            }
        }
        axios.post(typeAdd === "single" ? "http://localhost:8003/api/food/add-food" : "http://localhost:8003/api/food/add-multi", form, {
            "headers": {
                "Content-type": 'multipart/form-data'
            }
        }).then(res => setInput({
            name: "",
            description: "",
            price: 0,
            image: null,
            excel: null
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
            <FormControl variant="outlined" style={{ position: "absolute", right: "60px", top: "100px", minWidth: "140px" }}>
                <InputLabel id="demo-simple-select-outlined-label">Số lượng thêm</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={typeAdd}
                    onChange={(event) => setTypeAdd(event.target.value)}
                >
                    <MenuItem value={"single"}>Một</MenuItem>
                    <MenuItem value={"multi"}>Nhiều</MenuItem>
                </Select>
            </FormControl>
            <form encType="multipart/form-data" style={{ width: "90%" }} onSubmit={(event) => handleSubmit(event)}>
                <div style={{ fontSize: "36px", marginBottom: "16px", textAlign: "center" }}>Thêm đồ ăn</div>

                {typeAdd === "single" ? <div style={{ display: "flex", flexDirection: "column" }}>
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
                    :
                    <div>
                        <input
                            type="file"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className={classes.input}
                            onChange={(event) => {
                                setInput({ ...input, excel: event.target.files[0] })
                            }}
                            id="excel" />
                        <Card style={{ marginBottom: "16px" }}>
                            <CardActionArea>
                                <label htmlFor="excel">
                                    <div style={{ fontSize: "16px", padding: "12px", borderBottom: "1px solid #0000001f" }}>Tải file excel lên</div>
                                    <CardMedia style={{ padding: "20px", maxWidth: "90%", marginLeft: "auto", marginRight: "auto", boxSizing: "border-box" }} >
                                        <div style={{ display: "flex", border: "1px dashed #0000001f", padding: "20px" }}>
                                            <img src={addFile} height="100px" alt="add-food-icon"></img>
                                            <div >
                                                <div style={{ fontSize: "24px", fontWeight: "bold" }}>Chọn file excel</div>
                                                <div>Thả file excel vào đây hoặc là ấn vào đây để chọn file từ máy của bạn</div>
                                            </div>
                                        </div>

                                    </CardMedia>
                                </label>
                                {input.excel ? <div style={{ margin: "20px 40px", display: "flex", flexDirection: "column" }}>{input.excel.name}</div> : null}
                            </CardActionArea>

                        </Card>
                    </div>
                }

                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple={typeAdd === "single" ? false : true}
                    type="file"
                    onChange={(event) => {
                        typeAdd === "single" ? setInput({ ...input, image: event.target.files[0] }) : setInput({ ...input, image: Object.values(event.target.files) })
                    }}
                />
                <Card >
                    <CardActionArea>
                        <label htmlFor="contained-button-file">
                            <div style={{ fontSize: "16px", padding: "12px", borderBottom: "1px solid #0000001f" }}>Tải ảnh lên</div>
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
                        {input.image ? <div style={{ margin: "20px 40px", display: "flex", flexDirection: "column" }}>{typeAdd === "single" ? input.image.name : (input.image.length > 0 ? input.image.map(el => <div key={el.name} style={{ marginTop: "16px" }}>{el.name}</div>) : null)}</div> : null}
                    </CardActionArea>

                </Card>
                <Button type="submit" style={{ marginBottom: "100px", marginLeft: "auto", marginRight: "auto", display: "flex", marginTop: "20px" }} variant="contained" color="primary" >Submit</Button>
            </form>

        </div >
    )
}
export default AddFoodInfo