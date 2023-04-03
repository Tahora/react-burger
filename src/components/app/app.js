import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Outlet,
  useNavigate,
} from "react-router-dom";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RegistrationPage } from "../../pages/registration";
import { LoginPage } from "../../pages/login";
import { ForgotPasswordPage } from "../../pages/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password";
import { ProfilePage } from "../../pages/profile";
import { ProfileInfo } from "../profile-info/profile-info";
import { tryGetUserData } from "../../services/actions/authorization";
import { ProtectedRouteElement } from "../protected-route-element/protected-route-element";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export function App() {
  const { ingredients, isLoading, hasError } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    isLoading: store.ingredients.ingredientsRequest,
    hasError: store.ingredients.ingredientsFailed,
    user: store.register.user,
  }));

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(tryGetUserData({ errName: "" }));
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <Routes location={location.state?.backgroundLocation || location}>
          <Route
            path="/register"
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<LoginPage />}
              />
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<ResetPasswordPage />}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement children={<Outlet />} />}
          >
            <Route
              path=""
              element={
                <ProtectedRouteElement
                  children={
                    <ProfilePage>
                      <ProfileInfo />
                    </ProfilePage>
                  }
                />
              }
            />
            <Route
              path="orders"
              element={<ProtectedRouteElement children={<></>} />}
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
                <Modal
                  hideFunction={() => {
                    navigate(-1);
                  }}
                  isOver={true}
                >
                  <IngredientDetails></IngredientDetails>
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}
