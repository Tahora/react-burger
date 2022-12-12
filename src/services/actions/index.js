import { getIngredientsRequest, getOrderIdRequest, getData} from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const SHOW_INGREDIENT_DETAIL = 'SHOW_INGREDIENT_DETAIL';
export const HIDE_INGREDIENT_DETAIL = 'HIDE_INGREDIENT_DETAIL';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

export const INCREASE_COUNTER = 'INCREASE_COUNTER';
export const DECREASE_COUNTER = 'DECREASE_COUNTER';

export const REPLACE_CONSTRUCTOR_ITEM ='REPLACE_CONSTRUCTOR_ITEM';

export function getIngredients() {
    return function(dispatch) {
        // начали выполнять запрос
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        })
        // Запрашиваем данные у сервера
        getData(getIngredientsRequest).then( res  => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS,   ingredients: res.data  })
        }).catch( err => {
            dispatch({  type: GET_INGREDIENTS_FAILED   })
        })
    }
}

export function getOrder(ingredientsId) {
    return function(dispatch) {
        // начали выполнять запрос
        dispatch({
            type: GET_ORDER_REQUEST
        })
        // Запрашиваем данные у сервера
        getData( getOrderIdRequest, ingredientsId).then( res  => {
            dispatch({ type: GET_ORDER_SUCCESS,   order: res  })
        }).catch( err => {
            dispatch({  type: GET_ORDER_FAILED   })
        })
    }
}

export const showIngredientDetail = (item) => {
    return {
    type: SHOW_INGREDIENT_DETAIL,
    ingredient: item}
}

export const hideIngredientDetail = () => {
    return {
        type: HIDE_INGREDIENT_DETAIL}
}

export const addIngredient = (item) => {
    return {
        type: ADD_INGREDIENT,
        item: item}
}

export const deleteIngredient = (index) => {
    return {
        type: DELETE_INGREDIENT,
        index:index}
}

export const addBun = (item) => {
    return {
        type: ADD_BUN,
        item: item}
}

export const increaseCounter = (id, count=1) => {
    return {
        type: INCREASE_COUNTER,
        id: id,
        count:count}
}

export const decreaseCounter = (id, count=1) => {
    return {
        type: DECREASE_COUNTER,
        id: id,
        count:count}
}

export const replaceConstructorItem = (itemIndex, newIndex) => {
    return {
        type: REPLACE_CONSTRUCTOR_ITEM,
        itemIndex: itemIndex,
        newIndex: newIndex}
}



