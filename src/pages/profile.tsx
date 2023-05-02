import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import { logoutUser } from "../services/actions/authorization";
import { useAppDispatch } from "../hooks/redux";
import { FCC } from "../utils/types";

const linkStyle = (isActive: boolean, classNames: string) => {
  return `${styles.menuitem} text text_type_main-medium ${classNames}  ${
    isActive ? styles.active : ""
  } `;
};

export const ProfilePage: FCC = (props) => {
  const dispatch = useAppDispatch();

  const logout = () => {
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
        <NavLink
          className={({ isActive }) => linkStyle(isActive, "")}
          to="/profile/orders"
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={`${styles.menuitem} text text_type_main-medium`}
          onClick={(e) => logout()}
        >
          Выход
        </NavLink>
        <p
          className={`${styles.hinttext}  text text_type_main-default mt-10 pt-6 text_color_inactive`}
        >
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};