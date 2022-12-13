export const SHOW_INGREDIENT_DETAIL = "SHOW_INGREDIENT_DETAIL";
export const HIDE_INGREDIENT_DETAIL = "HIDE_INGREDIENT_DETAIL";

export const showIngredientDetail = (item) => {
    return {
        type: SHOW_INGREDIENT_DETAIL,
        ingredient: item,
    };
};

export const hideIngredientDetail = () => {
    return {
        type: HIDE_INGREDIENT_DETAIL,
    };
};
