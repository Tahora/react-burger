import React from 'react';
import styles from './burgerIngredients.module.css';
import commonStyles from '../common.module.css';
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngridientCard} from '../ingridientCard/ingridientCard';


export function BurgerIngredients (burgerdata) {
    const [current, setCurrent] = React.useState('1')
    return (
        <section className={`${styles.burgerIngredients}`} >
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div  style={{ display: 'flex' }}>
            <Tab value="1" active={current === '1'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="2" active={current === '2'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="3" active={current === '3'} onClick={setCurrent}>
                Начинки
            </Tab>
            </div>
            <div className={`${commonStyles.scrolledArea}  mt-10`}>
            <h2 className='text text_type_main-medium mb-6'>Булки</h2>
            <div className={`${styles.ingridientsTable} pl-4 pr-4`}>
            {burgerdata.filter((i)=>{return i.type==="bun"}).map((i,key)=>{
                const {name, price, image}=i;
                return (IngridientCard({key, name, price, image, count:false}))})}
            </div>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Соусы</h2>
            <div className={`${styles.ingridientsTable} pl-4 pr-4`}>
                {burgerdata.filter((i)=>{return i.type==="sauce"}).map((i, key)=>{
                    const {name, price, image}=i;
                    return (IngridientCard({key, name, price, image, count:false}))})}
            </div>
            <h2 className='text text_type_main-medium mt-10 mb-6'>Начинки</h2>
            <div className={`${styles.ingridientsTable} pl-4 pr-4`}>
                {burgerdata.filter((i)=>{return i.type==="main"}).map((i, key)=>{
                    const {name, price, image}=i;
                    return (IngridientCard({key, name, price, image, count:false}))})}
            </div>
            </div>
        </section>
    )
}

