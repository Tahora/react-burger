import React, { useReducer, useEffect } from "react";
import styles from "./burgerConstructor.module.css";
import commonStyles from "../common.module.css";
import { ConstructorItem } from "../constructorItem/constructorItem";
import { OrderTotal } from "../orderTotal/orderTotal";
import { OrderDetails } from "../orderDetails/orderDetails";
import { Modal } from "../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import { increaseCounter,  decreaseCounter} from "../../services/actions/ingredients";
import { getOrder} from "../../services/actions/order";
import { addBun,  addIngredient,  deleteIngredient,} from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import { dragTypesConstructor, strBun } from "../../utils/constants";

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

  const dispatch2 = useDispatch();

  const mainItems = useSelector((store) => store.constructor.ingredients);
  const bun = useSelector((store) => store.constructor.bun);

  const [collected, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (!bun || bun._id !== item._id) {
        if (item.type === strBun && bun) {
          dispatch2(decreaseCounter(bun._id, 2));
        }
        dispatch2(item.type === strBun ? addBun(item) : addIngredient(item));
        dispatch2(increaseCounter(item._id, item.type === strBun ? 2 : 1));
      }
    },
  });

  function reducer(state, action) {
    return total(action.bun, action.items);
  }

  const [stateTotal, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    dispatch({ bun: bun, items: mainItems });
  }, [bun, mainItems]);

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
    dispatch2(getOrder(ingredients));
    showModal();
  };

  function onDelete(ind, id) {
    dispatch2(deleteIngredient(ind));
    dispatch2(decreaseCounter(id));
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
              key={i._id}
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
        <OrderTotal total={stateTotal} onClick={handleClick} />
      </div>
      {modalState && (
        <Modal hideFunction={hideModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
