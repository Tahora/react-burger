import React from "react";
import styles from "./order-view.module.css";
import { TimeView } from "./components/time-view";
import { PriceView } from "./components/price-view";
import { StatusView } from "./components/status-view";
import { IngredientIcon } from "./components/ingredient-icon";
import { UseOrderInfo } from "../../hooks/use-order-info";
import PropTypes from "prop-types";

export function OrderView(props) {
  const { order, total, uniqueIngredients } = UseOrderInfo(props.id);
  const showState = props?.showState || false;
  const ordersNums = Object.keys(uniqueIngredients);
  const overflow = ordersNums.length - 6;
  return (
    <div className={`${styles.container}`}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        {`#${order?.number}`}
      </p>
      <div className={styles.date}>
        <TimeView date={order?.createdAt} className={styles.date} />
      </div>

      <p
        className={`text text_type_main-medium ${styles.orderName} mt-6`}
      >{`${order?.name}`}</p>
      {showState && (
        <div className={`mt-2`}>
          <StatusView status={order?.status} />
        </div>
      )}

      <div className={`${styles.iconStack}`}>
        {ordersNums?.slice(0, 6).map((key, ind) => {
          const i = uniqueIngredients[key];
          return (
            <IngredientIcon
              key={i.uuid}
              image={i.image}
              index={ordersNums.length - ind}
              hidedCount={ind === 5 ? overflow : 0}
            />
          );
        })}
      </div>
      <div className={`${styles.priceArea} mt-8 mb-2`}>
        <PriceView text={total()} />
      </div>
    </div>
  );
}

OrderView.propTypes = {
  id: PropTypes.string.isRequired,
  showState: PropTypes.bool,
};
