import styles from "./ingredient-icon.module.css";
import React from "react";

export const IngredientIcon: React.FC<{ index?:number;  image:string; hidedCount?:number }> = (props)=>{
  const{hidedCount=0}=props
  return (
    <div
      style={{ zIndex: props?.index || 0 }}
      className={`${styles.iconContainer}`}
    >
      <img className={`${styles.icon}`} src={props.image} />
      {hidedCount > 0 && (
        <div
          className={`${styles.icon} ${styles.overlay} text text_type_main-small`}
        >
          {`+${props?.hidedCount}`}
        </div>
      )}
    </div>
  );
}


