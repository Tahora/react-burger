import {
  DECREASE_COUNTER,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_COUNTER,
} from "../actions/ingredients";

export const initStateIngredients = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initStateIngredients, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    case INCREASE_COUNTER: {
      return {
        ...state,
        ingredients: state.ingredients.map((i) => {
          return i._id !== action.id
            ? i
            : { ...i, count: i.count ? i.count + action.count : action.count };
        }),
      };
    }
    case DECREASE_COUNTER: {
      return {
        ...state,
        ingredients: state.ingredients.map((i) => {
          return i._id !== action.id
            ? i
            : {
                ...i,
                count: i.count - action.count >= 0 ? i.count - action.count : 0,
              };
        }),
      };
    }
    default: {
      return state;
    }
  }
};
