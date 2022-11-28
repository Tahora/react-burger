import React from "react";
import styles from "./headerItem.module.css";
import PropTypes from "prop-types";

export function HeaderItem(props) {
  const IconName = props.icon;
  return (
    <a
      href="#"
      className={`${styles.headerItem}  ${
        !props.isActive && styles.inactive
      } pl-5 pr-5 pb-4 pt-4  text text_type_main-default`}
    >
      <IconName type={props.isActive ? "primary" : "secondary"} />
      <span className={`${styles.headerItemCaption}`}> {props.caption} </span>
    </a>
  );
}

HeaderItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  caption: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
