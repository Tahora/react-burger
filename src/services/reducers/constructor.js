import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REPLACE_CONSTRUCTOR_ITEM,
} from "../actions";
import { replaceItem } from "../../utils/common";

export const initStateConstructor = {
  bun: null,
  ingredients: [],
};

export const constructorReducer = (state = initStateConstructor, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return { ...state, ingredients: [...state.ingredients, action.item] };
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
