import React from "react";
import styles from "./orders-state.module.css";
import { useSelector } from "react-redux";

export function OrdersState() {
  const message = useSelector(
    (state) => state.ws?.messages[state.ws?.messages.length - 1]
  );

  const doneOrders = message?.orders?.filter((i) => {
    return i.status === "done";
  });
  const inWorkOrders = message?.orders?.filter((i) => {
    return i.status !== "done";
  });

  return (
    <div className={styles.container}>
      <p
        className={`text text_type_main-medium ${styles.row1} ${styles.column1} mb-6`}
      >
        Готовы:
      </p>
      <p
        className={`text text_type_main-medium ${styles.row1} ${styles.column2} mb-6`}
      >
        В работе:
      </p>
      <div
        className={`text text_type_digits-default ${styles.row2} ${styles.column1} ${styles.numbers} ${styles.blue}`}
      >
        {doneOrders?.map((i) => {
          return <span key={`${i.number}`}>{i.number}</span>;
        })}
      </div>
      <div
        className={`text text_type_digits-default ${styles.row2} ${styles.column2}  ${styles.numbers}`}
      >
        {inWorkOrders?.map((i) => {
          return <span key={`${i.number}`}>{i.number}</span>;
        })}
      </div>
      <p className={`text text_type_main-medium ${styles.row3}  mt-15`}>
        Выполнено за все время:
      </p>
      <p className={`text text_type_digits-large ${styles.row4} `}>
        {message?.total}
      </p>
      <p className={`text text_type_main-medium ${styles.row5} mt-15`}>
        Выполнено за сегодня:
      </p>
      <p className={`text text_type_digits-large ${styles.row6} `}>
        {message?.totalToday}
      </p>
    </div>
  );
}
