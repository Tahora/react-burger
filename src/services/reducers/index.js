import { combineReducers } from 'redux';
import {replaceItem} from '../../utils/common';
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_COUNTER,
    DECREASE_COUNTER,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    SHOW_INGREDIENT_DETAIL,
    HIDE_INGREDIENT_DETAIL,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    ADD_BUN,
    REPLACE_CONSTRUCTOR_ITEM} from '../actions/index'

const initStateIngredients = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const ingredientsReducer = (state = initStateIngredients, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return { ...state,  ingredientsRequest: true };
        }
        case GET_INGREDIENTS_SUCCESS: {
                return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
            }
        case GET_INGREDIENTS_FAILED: {
                return { ...state, ingredientsFailed: true, ingredientsRequest: false };
            }
        case INCREASE_COUNTER: {
            return { ...state, ingredients: state.ingredients.map((i)=>{return i._id!==action.id?i:{...i, count:i.count?i.count+action.count:action.count}}) };
        }
        case DECREASE_COUNTER: {
            return { ...state, ingredients: state.ingredients.map((i)=>{return i._id!==action.id?i:{...i, count: (i.count-action.count)>=0?i.count-action.count:0}}) };
        }
        default: {
                return state;
            }
        }
    }


const initStateOrder = {
    orderInfo: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initStateOrder, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return { ...state,  orderRequest: true };
        }
        case GET_ORDER_SUCCESS: {
            return { ...state, orderFailed: false, orderInfo: action.order, orderRequest: false };
        }
        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }
        default: {
            return state;
        }
    }
}

const initStateIngredientDetail = {
    ingredientDetail: null
};

export const ingredientDetailReducer = (state = initStateIngredientDetail, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT_DETAIL: {
            return { ...state,  ingredientDetail: action.ingredient };
        }
        case HIDE_INGREDIENT_DETAIL: {
            return initStateIngredientDetail;
        }
        default: {
            return state;
        }
    }
}

const initStateConstructor = {
    bun: null,
    ingredients: []
};

export const constructorReducer = (state = initStateConstructor, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return { ...state,  ingredients: [...state.ingredients, action.item] };
        }
        case ADD_BUN: {
            return { ...state,  bun: action.item };
        }
        case DELETE_INGREDIENT: {
            return  { ...state,  ingredients: state.ingredients.filter((i, ind)=>{return ind!==action.index }) };
        }
        case REPLACE_CONSTRUCTOR_ITEM: {
            return  { ...state,  ingredients: replaceItem(action.itemIndex, action.newIndex, state.ingredients) };
        }
        default: {
            return state;
        }
    }
}



export const rootReducer = combineReducers({
    ingredients : ingredientsReducer ,
    order: orderReducer,
    ingredientDetail: ingredientDetailReducer,
    constructor: constructorReducer
});

export const initState={
    ingredients : initStateIngredients ,
    order: initStateOrder,
    ingredientDetail: initStateIngredientDetail,
    constructor: initStateConstructor
}
