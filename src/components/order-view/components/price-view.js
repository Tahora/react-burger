import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./price-view.module.css";
import PropTypes from "prop-types";

export function PriceView(props) {
  return (
    <div className={`${styles.priceArea} mt-2 mb-2`}>
      <p className={`${styles.price} text text_type_digits-default`}>
        {props.text}
      </p>
      <CurrencyIcon type="primary" />
    </div>
  );
}

PriceView.propTypes = {
  text: PropTypes.string.isRequired,
};
