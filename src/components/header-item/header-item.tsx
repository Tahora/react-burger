import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./header-item.module.css";

interface IHeaderItem {
  icon: any;
  href: string;
  caption: string;
}

export function HeaderItem({ icon, href, caption }: IHeaderItem) {
  const IconName = icon;
  return (
    <NavLink
      end
      to={href}
      className={({ isActive }) => `${styles.headerItem}       
      pl-5 pr-5 pb-4 pt-4  text text_type_main-default ${
        isActive ? styles.active : ""
      }`}
    >
      <IconName type={"primary"} />
      <span className={`${styles.headerItemCaption}`}> {caption} </span>
    </NavLink>
  );
}
