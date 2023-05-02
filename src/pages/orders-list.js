import React from "react";
import styles from "./orders-list.module.css";
import { OrdersList } from "../components/olders-list/orders-list";
import { OrdersState } from "../components/orders-state/orders-state";

export function OrdersListPage() {
  return (
    <div className={styles.container}>
      <h1 className={`text text_type_main-large ${styles.row1} mb-5`}>
        Лента заказов
      </h1>
      <div className={`${styles.row2} ${styles.column1}`}>
        <OrdersList />
      </div>
      <div className={`${styles.row2} ${styles.column2}`}>
        <OrdersState />
      </div>
    </div>
  );
}
