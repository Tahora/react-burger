import React from "react";
import styles from "./ingridientCard.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export function IngredientCard(props) {
  return (
    <div className={styles.ingredientCard} onClick={props.showModal}>
      {props.count > 0 && (
        <Counter count={props.count} size="default" extraClass="m-1" />
      )}
      <img src={`${props.image}`} alt={props.name} />
      <div className={`${styles.priceArea} mt-2 mb-2`}>
        <p className={`${styles.price} text text_type_digits-default`}>
          {props.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {props.name}
      </p>
    </div>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  showModal: PropTypes.func.isRequired,
};
