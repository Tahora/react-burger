import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./headerItem.module.css";
import PropTypes from "prop-types";

export function HeaderItem(props) {
  const IconName = props.icon;
  return (
    <NavLink
      end
      to={props.href}
      className={({ isActive }) => `${styles.headerItem}       
      pl-5 pr-5 pb-4 pt-4  text text_type_main-default ${
        isActive ? styles.active : ""
      }`}
    >
      <IconName type={true ? "primary" : "secondary"} />
      <span className={`${styles.headerItemCaption}`}> {props.caption} </span>
    </NavLink>
  );
}

HeaderItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  caption: PropTypes.string.isRequired,
};
