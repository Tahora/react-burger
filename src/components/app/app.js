import React, { useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/appHeader";
import { BurgerIngredients } from "../burgerIngredients/burgerIngredients";
import { BurgerConstructor } from "../burgerConstructor/burgerConstructor";
import { getIngredients } from "../../services/actions";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function App() {
  const { ingredients, isLoading, hasError } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    isLoading: store.ingredients.ingredientsRequest,
    hasError: store.ingredients.ingredientsFailed,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        {isLoading && "Загрузка..."}
        {hasError && "Произошла ошибка"}
        {!isLoading && !hasError && ingredients?.length && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </>
        )}
      </main>
    </div>
  );
}
