import {getData, getOrderIdRequest} from "../../utils/api";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";


export function getOrder(ingredientsId) {
    return function (dispatch) {
        // начали выполнять запрос
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        // Запрашиваем данные у сервера
        getData(getOrderIdRequest, ingredientsId)
            .then((res) => {
                dispatch({ type: GET_ORDER_SUCCESS, order: res });
            })
            .catch((err) => {
                dispatch({ type: GET_ORDER_FAILED });
            });
    };
}
