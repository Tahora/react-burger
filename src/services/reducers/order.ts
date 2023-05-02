import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  TOrderActions,
} from "../actions/order";
import { IOrderResponse } from "../../utils/types";

export interface IOrderState {
  orderInfo: IOrderResponse | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

export const initStateOrder: IOrderState = {
  orderInfo: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (state = initStateOrder, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, orderRequest: true };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderInfo: action.order,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    default: {
      return state;
    }
  }
};
