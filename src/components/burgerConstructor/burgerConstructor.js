import React, { useReducer, useEffect, useMemo } from "react";
import styles from "./burgerConstructor.module.css";
import commonStyles from "../common.module.css";
import { ConstructorItem } from "../constructorItem/constructorItem";
import { OrderTotal } from "../orderTotal/orderTotal";
import { OrderDetails } from "../orderDetails/orderDetails";
import { Modal } from "../modal/modal";
import { IngredientsContext } from "../../services/appContext";
import { loadDataToState, getOrderId } from "../../utils/api";

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

  const [items] = React.useContext(IngredientsContext);
  const orderState = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });

  function reducer(state, action) {
    return total(action.bun, action.items);
  }

  const allBuns = useMemo(() => {
    return items.data.data.filter((i) => {
      return i.type === "bun";
    });
  }, []);

  const allItems = useMemo(() => {
    return items.data.data.filter((i) => {
      return i.type !== "bun";
    });
  }, []);
  const mainItems = useMemo(() => {
    const itemsArray = [];
    for (let i = 0; i <= Math.random() * allItems.length; i++) {
      const filteredItems = allItems.filter((ai) => {
        return !itemsArray.some((item) => {
          return item._id === ai._id;
        });
      });
      itemsArray.push(
        filteredItems[Math.floor(Math.random() * filteredItems.length)]
      );
    }
    return itemsArray;
  }, []);
  const bun = useMemo(() => {
    return allBuns[Math.floor(Math.random() * allBuns.length)];
  }, []);

  const [stateTotal, dispatch] = useReducer(reducer, 0);
  useEffect(() => {
    dispatch({ bun: bun, items: mainItems });
  }, []);
  const [modalState, setModalState] = React.useState(false);
  const showModal = () => {
    setModalState(true);
  };
  const hideModal = () => {
    setModalState(null);
  };

  const handleClick = () => {
    const ingredients = [
      bun._id,
      ...mainItems.map((i) => {
        return i._id;
      }),
      bun._id,
    ];
    // noinspection JSIgnoredPromiseFromCall
    loadDataToState(getOrderId, ingredients, orderState);
    showModal(ingredients);
  };

  return (
    <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
      {bun && (
        <ConstructorItem
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )}

      <div
        className={`${styles.burgerConstructorMain} ${commonStyles.scrolledArea} mt-4 mb-4`}
      >
        {mainItems.map((i) => {
          return (
            <ConstructorItem
              key={i._id}
              isLocked={false}
              text={i.name}
              price={i.price}
              thumbnail={i.image}
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
          thumbnail={bun.image}
        />
      )}
      <div className="mt-10 mr-4">
        <OrderTotal total={stateTotal} onClick={handleClick} />
      </div>
      {modalState && (
        <Modal hideFunction={hideModal}>
          <OrderDetails orderState={orderState[0]} />
        </Modal>
      )}
    </section>
  );
}
