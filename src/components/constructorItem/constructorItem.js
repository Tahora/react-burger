import React from "react";
import styles from "./constructorItem.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export function ConstructorItem(props) {
  return (
    <div className={styles.item}>
      <div className={props.isLocked ? styles.invisible : ""}>
        <DragIcon type="primary" />
      </div>
      {<ConstructorElement {...props} />}
    </div>
  );
}

ConstructorItem.propTypes = {
  type: PropTypes.oneOf(["top", "bottom"]),
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
};
