import React from "react";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function IngredientDetails() {
  const { id } = useParams();

  const modalDetail = useSelector((store) =>
    store.ingredients.ingredients.find((item) => {
      return item._id === id;
    })
  );
  const { name, proteins, fat, carbohydrates, calories, image_large } = {
    ...modalDetail,
  };

  return (
    <div className={styles.ingredientDetails}>
      <h1 className={`${styles.header} text text_type_main-large`}>
        Детали ингредиента
      </h1>
      <img src={image_large} alt={name} />
      <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
      <div className={`${styles.nutritionGrid} mb-5`}>
        <p className="text text_type_main-default">Калории,ккал</p>
        <p className="text text_type_main-default">Белки, г</p>
        <p className="text text_type_main-default">Жиры, г</p>
        <p className="text text_type_main-default">Углеводы, г</p>
        <p className="text text_type_digits-default">{calories}</p>
        <p className="text text_type_digits-default">{proteins}</p>
        <p className="text text_type_digits-default">{fat}</p>
        <p className="text text_type_digits-default">{carbohydrates}</p>
      </div>
    </div>
  );
}
