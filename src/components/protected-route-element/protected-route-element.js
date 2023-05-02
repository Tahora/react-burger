import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRouteElement({ children, anonymous = false, rootLocation=null }) {

  const { user, userDataRequest } = {
    ...useSelector((state) => state.register),
  };
  const isLoggedIn = user.name && user.email;
  const location = useLocation();
  const fromLocation=rootLocation||location
  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} state={from.state}/>;
  }
  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    //если выполняется запрос авторизации подождем его результат
    if (userDataRequest) {
      return null;
    }
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: fromLocation }} />;
  }
  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
