import { combineReducers } from "redux";
import { initStateConstructor, constructorReducer } from "./constructor";
import { initStateIngredients, ingredientsReducer } from "./ingredients";
import { initStateOrder, orderReducer } from "./order";
import { initStateForms, formReducer } from "./forms";
import { initStateRegister, registerReducer } from "./authorization";
import { initialStateWsSocket, wsReducer } from "./websocket";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  constructor: constructorReducer,
  forms: formReducer,
  register: registerReducer,
  ws: wsReducer,
});

export const initState = {
  ingredients: initStateIngredients,
  order: initStateOrder,
  constructor: initStateConstructor,
  forms: initStateForms,
  register: initStateRegister,
  ws: initialStateWsSocket,
};
