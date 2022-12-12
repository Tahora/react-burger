import React, {useMemo,  useRef} from "react";
import styles from "./burgerIngredients.module.css";
import commonStyles from "../common.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCard } from "../ingridientCard/ingredientCard";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredientDetails/ingredientDetails";
import { useSelector, useDispatch } from 'react-redux';
import {showIngredientDetail, hideIngredientDetail} from "../../services/actions";

export function BurgerIngredients() {
  const dispatch = useDispatch();

  const modalDetail = useSelector(store => store.ingredientDetail.ingredientDetail);

  const  burgerData  = useSelector(store => ( store.ingredients.ingredients));

  const [current, setCurrent] = React.useState("1");


  function showModal(ingredient) {
    dispatch(showIngredientDetail(ingredient));
  }

  function hideModal() {
    dispatch(hideIngredientDetail());
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

  const refBun=useRef(null);
  const refSauce=useRef(null);
  const refMain=useRef(null);


  function handleScroll(e) {
    const t=e.target.getBoundingClientRect().top;
    const topb=Math.abs(refBun.current?.getBoundingClientRect().top-t);
    const tops=Math.abs(refSauce.current?.getBoundingClientRect().top-t);
    const topm=Math.abs(refMain.current?.getBoundingClientRect().top-t);
    const positions= [topb,tops, topm];
    const minInd=''+(positions.indexOf( Math.min(...positions))+1);
    if (minInd!==current) {
      setCurrent(minInd);
    }
  }

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
      <div className={`${commonStyles.scrolledArea}  mt-10`} onScroll={handleScroll}>
        <h2 className="text text_type_main-medium mb-6" ref={refBun}>Булки</h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {buns.map((i) => {
            return (
              <IngredientCard
                key={i._id}
                ingredient={i._id}
                showModal={() => showModal(i)}
              />
            );
          })}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={refSauce}>Соусы</h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {sauces.map((i) => {
            return (
              <IngredientCard
                key={i._id}
                ingredient={i._id}
                showModal={() => showModal(i)}
              />
            );
          })}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6"  ref={refMain}>Начинки</h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {mains.map((i) => {
            return (
              <IngredientCard
                key={i._id}
                ingredient={i._id}
                showModal={() => showModal(i)}
              />
            );
          })}
        </div>
      </div>
      {modalDetail && (
        <Modal hideFunction={hideModal}>
          <IngredientDetails></IngredientDetails>
        </Modal>
      )}
    </section>
  );
}
