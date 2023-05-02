import React from "react";
import styles from "./order-total.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/redux";

export const OrderTotal: React.FC<{ onClick: () => any }> = (props) => {
  const { total } = useAppSelector((store) => store.constructor);

  return (
    <div className={`${styles.container}`}>
      <p className="text text_type_digits-medium">{total ? total : 0}</p>
      <div className={`${styles.totalIconContainer} ml-2 mr-10`}>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={props.onClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
