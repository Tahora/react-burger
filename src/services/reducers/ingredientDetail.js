import { HIDE_INGREDIENT_DETAIL, SHOW_INGREDIENT_DETAIL } from "../actions";

export const initStateIngredientDetail = {
  ingredientDetail: null,
};

export const ingredientDetailReducer = (
  state = initStateIngredientDetail,
  action
) => {
  switch (action.type) {
    case SHOW_INGREDIENT_DETAIL: {
      return { ...state, ingredientDetail: action.ingredient };
    }
    case HIDE_INGREDIENT_DETAIL: {
      return initStateIngredientDetail;
    }
    default: {
      return state;
    }
  }
};
