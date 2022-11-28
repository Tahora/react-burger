import React, { useMemo } from "react";
import styles from "./burgerIngredients.module.css";
import commonStyles from "../common.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCard } from "../ingridientCard/ingredientCard";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { IngredientsContext } from "../../services/appContext";

export function BurgerIngredients() {
  const burgerData = React.useContext(IngredientsContext)[0].data.data;
  const [current, setCurrent] = React.useState("1");
  const [modalState, setModalState] = React.useState();

  function showModal(ingredient) {
    setModalState(ingredient);
  }

  function hideModal() {
    setModalState(null);
  }

  const buns = useMemo(
    () => burgerData.filter((item) => item.type === "bun"),
    [burgerData]
  );
  const mains = useMemo(
    () => burgerData.filter((item) => item.type === "main"),
    [burgerData]
  );
  const sauces = useMemo(
    () => burgerData.filter((item) => item.type === "sauce"),
    [burgerData]
  );

  return (
    <section className={`${styles.burgerIngredients}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabArea}>
        <Tab value="1" active={current === "1"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="2" active={current === "2"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="3" active={current === "3"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${commonStyles.scrolledArea}  mt-10`}>
        <h2 className="text text_type_main-medium mb-6">Булки</h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {buns.map((i) => {
            const { name, price, image } = i;
            return (
              <IngredientCard
                key={i._id}
                name={name}
                price={price}
                image={image}
                count={0}
                showModal={() => showModal(i)}
              />
            );
          })}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6">Соусы</h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {sauces.map((i) => {
            const { name, price, image } = i;
            return (
              <IngredientCard
                key={i._id}
                name={name}
                price={price}
                image={image}
                count={0}
                showModal={() => showModal(i)}
              />
            );
          })}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6">Начинки</h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {mains.map((i) => {
            const { name, price, image } = i;
            return (
              <IngredientCard
                key={i._id}
                name={name}
                price={price}
                image={image}
                count={0}
                showModal={() => showModal(i)}
              />
            );
          })}
        </div>
      </div>
      {modalState && (
        <Modal hideFunction={hideModal}>
          <IngredientDetails data={modalState}></IngredientDetails>
        </Modal>
      )}
    </section>
  );
}
