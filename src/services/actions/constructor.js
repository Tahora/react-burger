export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";

export const REPLACE_CONSTRUCTOR_ITEM = "REPLACE_CONSTRUCTOR_ITEM";

export const addIngredient = (item) => {
  return {
    type: ADD_INGREDIENT,
    item: item,
  };
};

export const deleteIngredient = (index) => {
  return {
    type: DELETE_INGREDIENT,
    index: index,
  };
};

export const addBun = (item) => {
  return {
    type: ADD_BUN,
    item: item,
  };
};

export const replaceConstructorItem = (itemIndex, newIndex) => {
  return {
    type: REPLACE_CONSTRUCTOR_ITEM,
    itemIndex: itemIndex,
    newIndex: newIndex,
  };
};
