import React, { useEffect } from "react";
import {Routes, Route, useLocation, Outlet} from "react-router-dom";
import styles from "./app.module.css";
import { AppHeader } from "../appHeader/appHeader";
import { BurgerIngredients } from "../burgerIngredients/burgerIngredients";
import { BurgerConstructor } from "../burgerConstructor/burgerConstructor";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RegistrationPage } from "../../pages/registration";
import { LoginPage } from "../../pages/login";
import { ForgotPasswordPage } from "../../pages/forgotPassword";
import { ResetPasswordPage } from "../../pages/resetPassword";
import { ProfilePage } from "../../pages/profile";
import { ProfileInfo } from "../profileInfo/profileInfo";
import { tryGetUserData } from "../../services/actions/authorization";
import { ProtectedRouteElement } from "../protectedRouteElement/protectedRouteElement";
import {  ModalRout } from "../modal/modalRout";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { hideIngredientDetail } from "../../services/actions/ingredientDetail";

export function App() {
  const { ingredients, isLoading, hasError } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    isLoading: store.ingredients.ingredientsRequest,
    hasError: store.ingredients.ingredientsFailed,
    user: store.register.user,
  }));

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetUserData({ errName: "" }));
    dispatch(getIngredients());
  }, []);


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <Routes location={location.state?.backgroundLocation || location}>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={ <Outlet />} />}
          >
            <Route
                path=""
              element={<ProtectedRouteElement element={<ProfilePage><ProfileInfo /></ProfilePage>} />}
            />
            <Route
              path="orders"
              element={<ProtectedRouteElement element={<></>} />}
            />
          </Route>
          <Route
            path="/"
            element={
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
            }
          />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
        </Routes>

        {location.state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <ModalRout>
                  <IngredientDetails></IngredientDetails>
                </ModalRout>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}
