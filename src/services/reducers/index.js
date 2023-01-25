import { combineReducers } from "redux";
import {
  initStateIngredientDetail,
  ingredientDetailReducer,
} from "./ingredientDetail";
import { initStateConstructor, constructorReducer } from "./constructor";
import { initStateIngredients, ingredientsReducer } from "./ingredients";
import { initStateOrder, orderReducer } from "./order";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientDetail: ingredientDetailReducer,
  constructor: constructorReducer,
});

export const initState = {
  ingredients: initStateIngredients,
  order: initStateOrder,
  ingredientDetail: initStateIngredientDetail,
  constructor: initStateConstructor,
};
