import { combineReducers } from "redux";
import {
  initStateIngredientDetail,
  ingredientDetailReducer,
} from "./ingredient-detail";
import { initStateConstructor, constructorReducer } from "./constructor";
import { initStateIngredients, ingredientsReducer } from "./ingredients";
import { initStateOrder, orderReducer } from "./order";
import { initStateForms, formReducer } from "./forms";
import { initStateRegister, registerReducer } from "./authorization";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientDetail: ingredientDetailReducer,
  constructor: constructorReducer,
  forms: formReducer,
  register: registerReducer,
});

export const initState = {
  ingredients: initStateIngredients,
  order: initStateOrder,
  ingredientDetail: initStateIngredientDetail,
  constructor: initStateConstructor,
  forms: initStateForms,
  register: initStateRegister,
};
