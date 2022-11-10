import React from 'react';
import styles from './app.module.css';
import {AppHeader} from "../appHeader/appHeader";
import {BurgerIngredients} from "../burgerIngredients/burgerIngredients";
import {BurgerConstructor} from "../burgerConstructor/burgerConstructor";
import {burgerdata} from '../../utils/data';

export function App () {
    const bun=burgerdata.find((i)=>{return i.type=="bun"});
    const items=burgerdata;
    return (
        <div  className={styles.app}>
            <AppHeader/>
            <main  className={styles.content}>
                <BurgerIngredients />
                {BurgerConstructor({bun, items})}
            </main>
        </div>
    )
}