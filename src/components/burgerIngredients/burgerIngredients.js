import React, { useMemo, useRef } from "react";
import styles from "./burgerIngredients.module.css";
import commonStyles from "../common.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientCard } from "../ingridientCard/ingredientCard";
import { useSelector} from "react-redux";
import {
  tabItemBun,
  tabItemSauce,
  tabItemMain,
  strBun,
  strSauce,
  strMain,
} from "../../utils/constants";
import { Link, useLocation } from "react-router-dom";

export function BurgerIngredients() {
  const location = useLocation();

  const burgerData = useSelector((store) => store.ingredients.ingredients);

  const [current, setCurrent] = React.useState(tabItemBun);

  const buns = useMemo(
    () => burgerData.filter((item) => item.type === strBun),
    [burgerData]
  );
  const mains = useMemo(
    () => burgerData.filter((item) => item.type === strMain),
    [burgerData]
  );
  const sauces = useMemo(
    () => burgerData.filter((item) => item.type === strSauce),
    [burgerData]
  );

  const refBun = useRef(null);
  const refSauce = useRef(null);
  const refMain = useRef(null);

  function handleScroll(e) {
    const t = e.target.getBoundingClientRect().top;
    const topb = Math.abs(refBun.current?.getBoundingClientRect().top - t);
    const tops = Math.abs(refSauce.current?.getBoundingClientRect().top - t);
    const topm = Math.abs(refMain.current?.getBoundingClientRect().top - t);
    const positions = [topb, tops, topm];
    const minInd = "" + (positions.indexOf(Math.min(...positions)) + 1);
    if (minInd !== current) {
      setCurrent(minInd);
    }
  }

  return (
    <section className={`${styles.burgerIngredients}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabArea}>
        <Tab
          value={tabItemBun}
          active={current === tabItemBun}
          onClick={setCurrent}
        >
          Булки
        </Tab>
        <Tab
          value={tabItemSauce}
          active={current === tabItemSauce}
          onClick={setCurrent}
        >
          Соусы
        </Tab>
        <Tab
          value={tabItemMain}
          active={current === tabItemMain}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${commonStyles.scrolledArea}  mt-10`}
        onScroll={handleScroll}
      >
        <h2 className="text text_type_main-medium mb-6" ref={refBun}>
          Булки
        </h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {buns.map((i) => {
            return (
              <Link
                key={i._id}
                to={`/ingredients/${i._id}`}
                style={{ textDecoration: "none", color: "#F2F2F3" }}
                state={{ backgroundLocation: location }}
              >
                <IngredientCard ingredientId={i._id} />
              </Link>
            );
          })}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={refSauce}>
          Соусы
        </h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {sauces.map((i) => {
            return (
              <Link
                key={i._id}
                to={`/ingredients/${i._id}`}
                style={{ textDecoration: "none", color: "#F2F2F3" }}
                state={{ backgroundLocation: location }}
              >
                <IngredientCard ingredientId={i._id} />
              </Link>
            );
          })}
        </div>
        <h2 className="text text_type_main-medium mt-10 mb-6" ref={refMain}>
          Начинки
        </h2>
        <div className={`${styles.ingredientsTable} pl-4 pr-4`}>
          {mains.map((i) => {
            return (
              <Link
                key={i._id}
                to={`/ingredients/${i._id}`}
                style={{ textDecoration: "none", color: "#F2F2F3" }}
                state={{ backgroundLocation: location }}
              >
                <IngredientCard ingredientId={i._id} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
