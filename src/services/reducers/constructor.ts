import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REPLACE_CONSTRUCTOR_ITEM,
  SET_TOTAL,
  TConstructorActions,
} from "../actions/constructor";

import { replaceItem } from "../../utils/common";
import { IUniqueIngredient } from "../../utils/types";
import { Reducer } from "redux";

export interface IConstructorState {
  bun: IUniqueIngredient | null;
  total: number;
  ingredients: IUniqueIngredient[];
}

export const initStateConstructor: IConstructorState = {
  bun: null,
  total: 0,
  ingredients: new Array<IUniqueIngredient>(0),
};

export const constructorReducer: Reducer<
  IConstructorState,
  TConstructorActions
> = (state = initStateConstructor, action: TConstructorActions) => {
  switch (action.type) {
    case SET_TOTAL: {
      return { ...state, total: action.total };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients
          ? [...state.ingredients, action.item]
          : new Array<IUniqueIngredient>(action.item),
      };
    }
    case ADD_BUN: {
      return { ...state, bun: action.item };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((i, ind) => {
          return ind !== action.index;
        }),
      };
    }
    case REPLACE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        ingredients: replaceItem(
          action.itemIndex,
          action.newIndex,
          state.ingredients
        ),
      };
    }
    default: {
      return state;
    }
  }
};
