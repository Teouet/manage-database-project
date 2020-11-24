import { removeFood } from "../actions/food"
import * as Types from "../actions/type"
const initState = {
    listFood: [],
    loading: false,
    mapFood: {},
    error: null,
    removeFood: []
}
const foodReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.GET_ALL_FOOD: {
            return { ...state, loading: true }
        }
        case Types.GET_ALL_FOOD_SUCCESS: {
            let listFoodAction = [...action.listFood];
            let mapFood = {}
            listFoodAction.forEach(el => {
                el.count = 0;
                mapFood[el.id] = el;
            })
            return { ...state, mapFood: { ...mapFood }, listFood: [...action.listFood], loading: false, error: null }
        }
        case Types.GET_ALL_FOOD_FAILED: {
            return { ...state, listFood: new Array(), loading: false, error: action.error }
        }
        case Types.REMOVE_FOOD: {
            let copyRemoveFood = [...state.removeFood]
            copyRemoveFood.push(action.id);
            return { ...state, removeFood: [...copyRemoveFood] }
        }
        case Types.ADD_FOOD_TO_CART: {
            let copyMapFood = { ...state.mapFood };
            copyMapFood[action.id].count += 1;
            return { ...state, mapFood: { ...copyMapFood } }
        }
        case Types.REMOVE_FOOD_IN_CART: {
            let copyMapFood = { ...state.mapFood };
            copyMapFood[action.id].count -= 1;
            return { ...state, mapFood: { ...copyMapFood } }
        }
        case Types.SAVE_LIST_FOOD: {
            return { ...state, loading: true }
        }
        case Types.SAVE_LIST_FOOD_SUCCESS: {
            return { ...state, loading: false, removeFood: new Array() }
        }
        case Types.DELETE_FOOD_IN_CART: {
            let copyMapFood = { ...state.mapFood };
            copyMapFood[action.id].count = 0;
            return { ...state, mapFood: { ...copyMapFood } }
        }
        default: return state
    }
}
export default foodReducer