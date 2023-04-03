import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import commonStyles from "../common.module.css";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { OrderTotal } from "../order-total/order-total";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCounter,
  decreaseCounter,
} from "../../services/actions/ingredients";
import { tryGetOrder } from "../../services/actions/order";
import {
  addBun,
  addIngredient,
  deleteIngredient,
  setTotal,
} from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { dragTypesConstructor, strBun } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

export function BurgerConstructor() {
  const total = (bun, items) => {
    const bunsTotal = bun ? bun.price * 2 : 0;
    const mainTotal = items
      ? items.reduce((prevSum, i) => {
          return prevSum + i.price;
        }, 0)
      : 0;
    return bunsTotal + mainTotal;
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const mainItems = useSelector((store) => store.constructor.ingredients);
  const bun = useSelector((store) => store.constructor.bun);

  const [collected, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (!bun || bun._id !== item._id) {
        if (item.type === strBun && bun) {
          dispatch(decreaseCounter(bun._id, 2));
        }
        item.uuid = v4();
        dispatch(item.type === strBun ? addBun(item) : addIngredient(item));
        dispatch(increaseCounter(item._id, item.type === strBun ? 2 : 1));
      }
    },
  });

  useEffect(() => {
    dispatch(setTotal(total(bun, mainItems)));
  }, [bun, mainItems]);

  const [modalState, setModalState] = React.useState(false);
  const showModal = () => {
    setModalState(true);
  };
  const hideModal = () => {
    setModalState(null);
  };

  const handleClick = () => {
    if (!(user?.email && user?.name)) {
      return navigate("/login");
    }
    const ingredients = bun?._id
      ? [
          bun._id,
          ...mainItems.map((i) => {
            return i._id;
          }),
          bun._id,
        ]
      : [
          ...mainItems.map((i) => {
            return i._id;
          }),
        ];
    dispatch(tryGetOrder({ ingredientsId: ingredients }));
    showModal();
  };

  function onDelete(ind, id) {
    dispatch(deleteIngredient(ind));
    dispatch(decreaseCounter(id));
  }

  return (
    <section ref={dropRef} className={`${styles.burgerConstructor} pt-25 pl-4`}>
      {bun && (
        <ConstructorItem
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
          dragType={dragTypesConstructor.bun}
          index={0}
        />
      )}

      <div
        className={`${styles.burgerConstructorMain} ${commonStyles.scrolledArea} mt-4 mb-4`}
      >
        {mainItems?.map((i, ind) => {
          return (
            <ConstructorItem
              key={i.uuid}
              isLocked={false}
              text={i.name}
              price={i.price}
              thumbnail={i.image}
              index={ind}
              dragType={dragTypesConstructor.other}
              handleClose={() => onDelete(ind, i._id)}
            />
          );
        })}
      </div>
      {bun && (
        <ConstructorItem
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          dragType={dragTypesConstructor.bun}
          thumbnail={bun.image}
          index={0}
        />
      )}
      <div className="mt-10 mr-4">
        <OrderTotal onClick={handleClick} />
      </div>
      {modalState && (
        <Modal hideFunction={hideModal} isOver={true}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
