import { getData, getOrderIdRequest } from "../../utils/api";
import { refreshToken } from "./authorization";
import { AppThunkAction } from "../../store/index";
import { IOrderResponse } from "../../utils/types";
import { TRetryAction } from "../../middleware/retry-middleware";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export interface IOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: IOrderResponse;
}

export interface IOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions =
  | IOrderRequestAction
  | IOrderSuccessAction
  | IOrderFailedAction;

export function getOrder(
  ingredientsId: string[],
  isContinueExeption: boolean
): AppThunkAction<void> {
  let continueExeption = isContinueExeption;
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    // Запрашиваем данные у сервера
    return getData<IOrderResponse, string[]>(getOrderIdRequest, ingredientsId)
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

export const tryGetOrder = ({
  ingredientsId,
}: {
  ingredientsId: string[];
}): TRetryAction<AppThunkAction<void>> => {
  return function (dispatch) {
    dispatch([getOrder(ingredientsId, true), refreshToken(true)]);
  };
};
