import * as Types from "./type"
export const getAllFoods = () => {
    return {
        type: Types.GET_ALL_FOOD
    }
}
export const getAllFoodSuccess = (listFood) => {
    return {
        type: Types.GET_ALL_FOOD_SUCCESS,
        listFood: listFood
    }
}
export const addFood = (name, description) => {
    return {
        type: Types.ADD_FOOD,
        name: name,
        description: description,
    }
}
export const removeFood = (id) => {
    return {
        type: Types.REMOVE_FOOD,
        id: id
    }
}
export const addFoodToCard = (id) => {
    return {
        type: Types.ADD_FOOD_TO_CART,
        id: id
    }
}
export const removeFoodInCart = (id) => {
    return {
        type: Types.REMOVE_FOOD_IN_CART,
        id: id
    }
}
export const saveListFood = () => {
    return {
        type: Types.SAVE_LIST_FOOD
    }
}
export const saveListFoodSuccess = () => {
    return {
        type: Types.SAVE_LIST_FOOD_SUCCESS
    }
}
export const deleteFoodInCart = (id) => {
    return {
        type: Types.DELETE_FOOD_IN_CART,
        id: id
    }
}