export const convertCardNumber = (cardNumber) => {
    let result = cardNumber.substring(0, 6);
    for (let i = 6; i < cardNumber.length; i++) {
        if (cardNumber[i] !== " ") {
            result += "*";
        } else {
            result += " "
        }
    }
    return result
}
export const addSpaceToTextField = (value) => {
    console.log("xxx value", value)
    let result = "";
    for (let i = 0; i < value.length; i++) {
        if (i % 4 === 0 && i !== 0 && i !== 15) {
            result += " "
        }
        result += value[i]
    }
    return result
}
export const addSpaceToCardNumber = (cardNumber) => {
    let result = ""
    for (let i = 0; i < cardNumber.length; i++) {
        result += cardNumber[i]
        if (i % 4 === 3 && i !== cardNumber.length - 1) {
            result += " "
        }
    }
    return result
}
export const calculatePrice = (mapFood) => {
    let result = 0;
    for (let ele in mapFood) {
        result += mapFood[ele].count * mapFood[ele].price
    }
    return result
}
export const convertNumber = (string) => {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] !== ",") {
            result += string[i];
        }
    }
    return result;
};
export const addString = (string) => {
    let div = string.length % 3;
    let i = div === 0 ? 3 : div
    let result = string.substring(0, i);
    let count = 0;
    for (i; i < string.length; i++) {
        if (count === 0 && string.length > 3) {
            count++
            result += ","
        }
        if (i > 3 && (i - div) % 3 === 0 && string[i] !== ",") {
            result += ",";
        }
        result += string[i];
    }
    return result;
};
