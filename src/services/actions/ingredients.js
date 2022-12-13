import {getData, getIngredientsRequest} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_ITEMS_FAILED";

export const INCREASE_COUNTER = "INCREASE_COUNTER";
export const DECREASE_COUNTER = "DECREASE_COUNTER";

export function getIngredients() {
    return function (dispatch) {
        // начали выполнять запрос
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        // Запрашиваем данные у сервера
        getData(getIngredientsRequest)
            .then((res) => {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data });
            })
            .catch((err) => {
                dispatch({ type: GET_INGREDIENTS_FAILED });
            });
    };
}

export const increaseCounter = (id, count = 1) => {
    return {
        type: INCREASE_COUNTER,
        id: id,
        count: count,
    };
};

export const decreaseCounter = (id, count = 1) => {
    return {
        type: DECREASE_COUNTER,
        id: id,
        count: count,
    };
};
