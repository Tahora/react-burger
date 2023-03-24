import React from "react";
import styles from "./ingridient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

export function IngredientCard(props) {
  const ingredient = useSelector((store) =>
    store.ingredients.ingredients.find((i) => {
      return i._id === props.ingredientId;
    })
  );
  const { name, price, image, count } = ingredient;

  const [collected, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <div className={styles.ingredientCard} ref={dragRef}>
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      <img src={`${image}`} alt={name} />
      <div className={`${styles.priceArea} mt-2 mb-2`}>
        <p className={`${styles.price} text text_type_digits-default`}>
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredientId: PropTypes.string.isRequired,
};
