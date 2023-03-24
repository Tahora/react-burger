import React from "react";
import { NavLink, Link} from "react-router-dom";
import styles from "./profile.module.css";
import { logoutUser } from "../services/actions/authorization";
import { useDispatch } from "react-redux";

const linkStyle = (isActive, classNames) => {
  return `${styles.menuitem} text text_type_main-medium ${classNames}  ${
    isActive ? styles.active : ""
  } `;
};

export function ProfilePage(props) {
  const dispatch = useDispatch();

  const logout = (e) => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <NavLink
          className={({ isActive }) => linkStyle(isActive, "")}
          end
          to="/profile"
        >
          Профиль
        </NavLink>
        <Link
          className={`${styles.menuitem} text text_type_main-medium`}
          to="/profile/orders"
        >
          История заказов
        </Link>
        <NavLink
          className={`${styles.menuitem} text text_type_main-medium`}
          onClick={(e) => logout(e)}
        >
          Выход
        </NavLink>
        <p
          className={`${styles.hinttext}  text text_type_main-default mt-10 pt-6 text_color_inactive`}
        >
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </div>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
}
