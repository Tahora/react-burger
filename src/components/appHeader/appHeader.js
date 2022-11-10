import React from "react";
import styles from './appHeader.module.css';
import HeaderItem from "../headerItem/headerItem";
import { BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

export function AppHeader () {
   return (
       <header className={`${styles.header} pb-4 pt-4`} >
           <div className={styles.logoItem}><Logo/></div>
           <nav className={styles.navigation}>
               <ul className={styles.headerList}>
                   <li><HeaderItem caption="Конструктор" icon={BurgerIcon}/></li>
                   <li><HeaderItem caption="Лента заказов" icon={ListIcon}/></li>
                   <li className={styles.lastItem}><HeaderItem caption="Личный кабинет" icon={ProfileIcon}/></li>
               </ul>
           </nav>
       </header>
   )
}

