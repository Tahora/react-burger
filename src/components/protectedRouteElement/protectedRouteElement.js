import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRouteElement({ element }) {
  const { user, userDataRequest, userDataFailed } = {
    ...useSelector((state) => state.register),
  };

  if (userDataRequest) {
    return null;
  }

  //если пользователь не прошёл аутентификацию и объекта user в хранилище нет, перенаправим его по маршруту /login
  return userDataFailed || Object.keys(user).length === 0 ? (
    <Navigate to="/login" replace />
  ) : (
    element
  );
}
