import React, { FC } from "react";
import styles from "./ingridient-card.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { useAppSelector } from "../../hooks/redux";

export const IngredientCard: FC<{ ingredientId: string }> = (props) => {
  const ingredient = useAppSelector((store) =>
    store.ingredients.ingredients.find((i) => {
      return i._id === props.ingredientId;
    })
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  if (!ingredient) return <></>;

  const { name, price, image, count } = ingredient;
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
};
