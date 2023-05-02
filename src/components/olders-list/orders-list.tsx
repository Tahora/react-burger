import React from "react";
import styles from "./orders-list.module.css";
import commonStyles from "../common.module.css";
import { OrderView } from "../order-view/order-view";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

export const OrdersList: React.FC = () => {
  const all = useAppSelector(
    (state) => state.ws?.messages[state.ws?.messages.length - 1]
  );

  const location = useLocation();
  const filterUserOrders = location.pathname.startsWith("/profile");

  return (
    <>
      <div className={`${styles.container} ${commonStyles.scrolledArea} pr-2`}>
        {all?.orders &&
          all.orders.map((i) => {
            return (
              <Link
                key={i._id}
                to={`${i._id}`}
                className={styles.link}
                state={{ backgroundLocation: location }}
              >
                <OrderView id={i._id} showState={filterUserOrders} />
              </Link>
            );
          })}
      </div>
    </>
  );
};