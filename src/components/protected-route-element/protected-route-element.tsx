import { useLocation, useNavigate } from "react-router-dom";
import { FCC } from "../../utils/types";
import { useAppSelector } from "../../hooks/redux";
import { Location } from "react-router";

export const ProtectedRouteElement: FCC<{
  anonymous?: boolean;
  rootLocation?: Location;
}> = (props) => {
  const { anonymous = false, rootLocation = null } = props;
  const navigate = useNavigate();
  const { user, userDataRequest } = {
    ...useAppSelector((state) => state.register),
  };
  const isLoggedIn = user?.name && user?.email;
  const location = useLocation();
  const fromLocation = rootLocation || location;
  const from = location.state?.from || "/";
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    navigate(from, { state: from.state });
  }
  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    //если выполняется запрос авторизации подождем его результат
    if (userDataRequest) {
      return null;
    }
    // ...то отправляем его на страницу логин
    navigate("/login", { state: { from: fromLocation } });
  }
  // Если все ок, то рендерим внутреннее содержимое
  return <>{props.children}</>;
};
