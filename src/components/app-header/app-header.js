import React from "react";
import styles from "./app-header.module.css";
import { HeaderItem } from "../header-item/header-item";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function AppHeader() {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <div className={styles.logoItem}>
        <Logo />
      </div>
      <nav className={styles.navigation}>
        <ul className={styles.headerList}>
          <li>
            <HeaderItem
              caption="Конструктор"
              icon={BurgerIcon}
              href="/"
              //isActive={true}
            />
          </li>
          <li>
            <HeaderItem
              caption="Лента заказов"
              icon={ListIcon}
              href="/profile/orders"
              //     isActive={false}
            />
          </li>
          <li className={styles.lastItem}>
            <HeaderItem
              caption="Личный кабинет"
              icon={ProfileIcon}
              href="/profile"
              // isActive={false}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
