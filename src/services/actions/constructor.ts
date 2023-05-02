import { IUniqueIngredient } from "../../utils/types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const SET_TOTAL: "SET_TOTAL" = "SET_TOTAL";

export const REPLACE_CONSTRUCTOR_ITEM: "REPLACE_CONSTRUCTOR_ITEM" =
  "REPLACE_CONSTRUCTOR_ITEM";

export type TConstructorActions =
  | ISetTotalAction
  | IAddIngredientAction
  | IDeleteIngredientAction
  | IAddBunAction
  | IReplaceConstructorItemAction;

export interface ISetTotalAction {
  readonly type: typeof SET_TOTAL;
  readonly total: number;
}

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: IUniqueIngredient;
}

export interface IDeleteIngredientAction {
  readonly type: typeof DELETE_INGREDIENT;
  readonly index: number;
}

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly item: IUniqueIngredient;
}

export interface IReplaceConstructorItemAction {
  readonly type: typeof REPLACE_CONSTRUCTOR_ITEM;
  readonly itemIndex: number;
  readonly newIndex: number;
}

export const setTotal = (total: number): ISetTotalAction => {
  return {
    type: SET_TOTAL,
    total: total,
  };
};

export const addIngredient = (
  item: IUniqueIngredient
): IAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    item: item,
  };
};

export const deleteIngredient = (index: number): IDeleteIngredientAction => {
  return {
    type: DELETE_INGREDIENT,
    index: index,
  };
};

export const addBun = (item: IUniqueIngredient): IAddBunAction => {
  return {
    type: ADD_BUN,
    item: item,
  };
};

export const replaceConstructorItem = (
  itemIndex: number,
  newIndex: number
): IReplaceConstructorItemAction => {
  return {
    type: REPLACE_CONSTRUCTOR_ITEM,
    itemIndex: itemIndex,
    newIndex: newIndex,
  };
};
