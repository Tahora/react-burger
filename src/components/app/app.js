import React from "react";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/appHeader";
import { BurgerIngredients } from "../burgerIngredients/burgerIngredients";
import { BurgerConstructor } from "../burgerConstructor/burgerConstructor";
import { getIngredients, loadDataToState } from "../../utils/api";
import { IngredientsContext } from "../../services/appContext";

export function App() {
  const ingredientsState = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  const [state] = ingredientsState;

  React.useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    loadDataToState(getIngredients, null, ingredientsState);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={ingredientsState}>
        <main className={styles.content}>
          {state.isLoading && "Загрузка..."}
          {state.hasError && "Произошла ошибка"}
          {!state.isLoading && !state.hasError && state.data?.data?.length && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </main>
      </IngredientsContext.Provider>
    </div>
  );
}
