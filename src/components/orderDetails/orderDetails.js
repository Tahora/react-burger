import React from "react";
import styles from "./orderDetails.module.css";
import graphics from "../../images/graphics.svg";
import { useSelector } from "react-redux";

export function OrderDetails() {
  const { order, isLoading, hasError } = useSelector((store) => ({
    order: store.order.orderInfo?.order?.number,
    isLoading: store.order.orderRequest,
    hasError: store.order.orderFailed,
  }));

  return (
    <div className={`${styles.orderDetails} mt-20 mb-20`}>
      <p
        className={`text ${
          isLoading ? "text_type_main-medium" : " text_type_digits-large"
        }`}
      >
        {isLoading && "Заказ формируется..."}
        {hasError && "Произошла ошибка"}
        {!isLoading && !hasError && order && order}
      </p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img className={styles.image} src={graphics} alt="ok" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}


