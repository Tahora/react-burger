import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../services/actions/ingredients";
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
import { OrdersList } from "../olders-list/orders-list";
import { OrderViewDetailed } from "../order-view/order-view-detailed";
import { WsConnector } from "../ws-connector/ws-connector";
import { OrdersListPage } from "../../pages/orders-list";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {RoutesPath} from "../../utils/types";

export function App() {
  const { ingredients, isLoading, hasError } = useAppSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    isLoading: store.ingredients.ingredientsRequest,
    hasError: store.ingredients.ingredientsFailed,
    user: store.register.user,
  }));

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(tryGetUserData({ errName: "" }));
    dispatch(getIngredients());
  }, []);

  const hideModal = () => {
    navigate(location.state?.backgroundLocation || location);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <Routes location={location.state?.backgroundLocation || location}>
          <Route
            path={RoutesPath.Register}
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<RegistrationPage />}
              />
            }
          />
          <Route
            path={RoutesPath.Login}
            element={
              <ProtectedRouteElement
                rootLocation={location}
                anonymous={true}
                children={<LoginPage />}
              />
            }
          />
          <Route
            path={RoutesPath.FogotPassword}
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<ForgotPasswordPage />}
              />
            }
          />
          <Route
            path={RoutesPath.ResetPassword}
            element={
              <ProtectedRouteElement
                anonymous={true}
                children={<ResetPasswordPage />}
              />
            }
          />
          <Route
            path={RoutesPath.Profile}
            element={
              <ProtectedRouteElement
                children={
                  <ProfilePage>
                    {" "}
                    <ProfileInfo />{" "}
                  </ProfilePage>
                }
              />
            }
          />
          <Route
            path={RoutesPath.UserOrders}
            element={
              <ProtectedRouteElement
                rootLocation={location}
                children={
                  <WsConnector>
                    <ProfilePage>
                      {" "}
                      <OrdersList />
                    </ProfilePage>{" "}
                  </WsConnector>
                }
              />
            }
          />
          <Route
            path={RoutesPath.UserOrder}
            element={
              <ProtectedRouteElement
                children={
                  <WsConnector>
                    <OrderViewDetailed />
                  </WsConnector>
                }
              />
            }
          />

          <Route
            path={RoutesPath.Root}
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
          <Route
            path={RoutesPath.Feeds}
            element={
              <WsConnector>
                <OrdersListPage />
              </WsConnector>
            }
          />
          <Route
            path={RoutesPath.Feed}
            element={
              <WsConnector>
                <OrderViewDetailed />
              </WsConnector>
            }
          />

          <Route path={RoutesPath.Ingredient} element={<IngredientDetails />} />
        </Routes>

        {location.state?.backgroundLocation && (
          <Routes>
            <Route
              path={RoutesPath.Ingredient}
              element={
                <Modal hideFunction={hideModal} isOver={true}>
                  <IngredientDetails></IngredientDetails>
                </Modal>
              }
            />
            <Route
              path={RoutesPath.Feed}
              element={
                <Modal hideFunction={hideModal} isOver={true}>
                  <OrderViewDetailed />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:id"
              element={
                <Modal hideFunction={hideModal} isOver={true}>
                  <OrderViewDetailed />
                </Modal>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}
