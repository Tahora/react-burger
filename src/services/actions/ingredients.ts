import { getData, getIngredientsRequest } from "../../utils/api";
import { AppThunkAction } from "../../store";
import { IIngredient, IIngredientsResponse } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

export const INCREASE_COUNTER: "INCREASE_COUNTER" = "INCREASE_COUNTER";
export const DECREASE_COUNTER: "DECREASE_COUNTER" = "DECREASE_COUNTER";

export type TIngredientsActions =
  | IDecreaseCounterAction
  | IIncreaseCounterAction
  | IIngredientsSuccessAction
  | IIngredientRequestAction
  | IIngredientRequestFailedAction;

export interface IDecreaseCounterAction {
  readonly type: typeof DECREASE_COUNTER;
  readonly id: string;
  readonly count: number;
}

export interface IIngredientRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientRequestFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIncreaseCounterAction {
  readonly type: typeof INCREASE_COUNTER;
  readonly id: string;
  readonly count: number;
}

export interface IIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: IIngredient[];
}

export function getIngredients(): AppThunkAction<void> {
  return function (dispatch) {
    // начали выполнять запрос
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    // Запрашиваем данные у сервера
    getData<IIngredientsResponse, undefined>(getIngredientsRequest, undefined)
      .then((res) => {
        dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}

export const increaseCounter = (
  id: string,
  count = 1
): IIncreaseCounterAction => {
  return {
    type: INCREASE_COUNTER,
    id: id,
    count: count,
  };
};

export const decreaseCounter = (
  id: string,
  count = 1
): IDecreaseCounterAction => {
  return {
    type: DECREASE_COUNTER,
    id: id,
    count: count,
  };
};
