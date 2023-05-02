import styles from "./ingredient-view.module.css";
import { IngredientIcon } from "./ingredient-icon";
import { PriceView } from "./price-view";
import React from "react";

export const IngredientView: React.FC<{ image: string; name: string; countPrice:string }> = (props)=>{
  const { image, name, countPrice } = props;
  return (
    <div className={styles.container}>
      <IngredientIcon image={image} />
      <p className={`text text_type_main-default`}>{name}</p>
      <div className={styles.priceArea}>
        <PriceView text={countPrice} />
      </div>
    </div>
  );
}

