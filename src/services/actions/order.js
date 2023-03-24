import { getData, getOrderIdRequest } from "../../utils/api";
import { refreshToken } from "./authorization";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrder(ingredientsId, isContinueExeption) {
  let continueExeption = isContinueExeption;
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    // Запрашиваем данные у сервера
    return getData(getOrderIdRequest, ingredientsId)
      .then((res) => {
        dispatch({ type: GET_ORDER_SUCCESS, order: res });
      })
      .catch((err) => {
        if (continueExeption) {
          continueExeption = false;
          throw err;
        }
        dispatch({ type: GET_ORDER_FAILED });
      });
  };
}

export const tryGetOrder = ({ ingredientsId, errName = "none" }) => {
  return function (dispatch) {
    dispatch([getOrder(ingredientsId, true), refreshToken(true)]);
  };
};
