import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import commonStyles from "../common.module.css";
import { ConstructorItem } from "../constructor-item/constructor-item";
import { OrderTotal } from "../order-total/order-total";
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
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
import { strBun } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IIngredientCounted, IUniqueIngredient } from "../../utils/types";

export const BurgerConstructor: React.FC = () => {
  const total = (bun: IUniqueIngredient | null, items: IUniqueIngredient[]) => {
    const bunsTotal = bun ? bun.price * 2 : 0;
    const mainTotal = items
      ? items.reduce((prevSum, i) => {
          return prevSum + i.price;
        }, 0)
      : 0;
    return bunsTotal + mainTotal;
  };
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.register);

  const dispatch = useAppDispatch();

  const mainItems = useAppSelector((store) => store.constructor.ingredients);
  const bun = useAppSelector((store) => store.constructor.bun);

  const [, dropRef] = useDrop<IIngredientCounted>({
    accept: "ingredient",
    drop(item) {
      if (!bun || bun._id !== item._id) {
        if (item.type === strBun && bun) {
          dispatch(decreaseCounter(bun._id, 2));
        }
        const addItem = { ...item, uuid: v4() } as IUniqueIngredient;
        dispatch(
          item.type === strBun ? addBun(addItem) : addIngredient(addItem)
        );
        dispatch(increaseCounter(item._id, item.type === strBun ? 2 : 1));
      }
    },
  });

  useEffect(() => {
    dispatch(setTotal(total(bun, mainItems)));
  }, [bun, mainItems]);

  const [modalState, setModalState] = React.useState<boolean | string>(false);
  const showModal = (message: boolean | string) => {
    setModalState(message || true);
  };
  const hideModal = () => {
    setModalState(false);
  };

  const handleClick = () => {
    if (!(user?.email && user?.name)) {
      return navigate("/login");
    }
    if (!bun?._id) {
      showModal("Нельзя делать бургеры без булок. Выберите себе булочку!");
      return;
    }
    const ingredients: string[] = [
      bun._id,
      ...mainItems.map((i) => {
        return i._id;
      }),
      bun._id,
    ];
    dispatch(tryGetOrder({ ingredientsId: ingredients }));
    showModal(false);
  };

  function onDelete(ind: number, id: string) {
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
          dragType="bun"
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
              dragType="constructor-item"
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
          dragType="bun"
          thumbnail={bun.image}
          index={0}
        />
      )}
      <div className="mt-10 mr-4">
        <OrderTotal onClick={handleClick} />
      </div>
      {modalState && (
        <Modal hideFunction={hideModal} isOver={true}>
          {modalState === true ? (
            <OrderDetails />
          ) : (
            <div className="text text_type_main-default">{modalState}</div>
          )}
        </Modal>
      )}
    </section>
  );
};
