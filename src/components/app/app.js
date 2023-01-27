import React, { useEffect } from "react";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/appHeader";
import { BurgerIngredients } from "../burgerIngredients/burgerIngredients";
import { BurgerConstructor } from "../burgerConstructor/burgerConstructor";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RegistrationPage} from "../../pages/registration";
import { LoginPage} from "../../pages/login";
import {ForgotPasswordPage} from "../../pages/forgotPassword";

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
          <BrowserRouter>
              <Routes>
                  <Route  path="/register" element={<RegistrationPage/>}/>
                  <Route  path="/login" element={<LoginPage/>}/>
                  <Route  path="/forgot-password" element={<ForgotPasswordPage/>}/>
                  <Route  path="/" element={
                      <>
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
                      </>
                  }/>
              </Routes>
          </BrowserRouter>

      </main>
    </div>
  );
}
