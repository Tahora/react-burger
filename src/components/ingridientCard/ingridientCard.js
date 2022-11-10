import React from 'react';
import styles from './ingridientCard.module.css';
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';


export function IngridientCard (props) {
    return (
        <div key={props.key} className={styles.ingridientCard}>
            {props.count &&
                (<Counter count={props.count} size="default" extraClass="m-1" />)}
            <img src={`${props.image}`} alt={props.name}/>
            <div className={`${styles.priceArea} mt-2 mb-2`}>
                <p  className={`${styles.price} text text_type_digits-default`}>{props.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.name} text text_type_main-default`}>{props.name}</p>
        </div>
    )
}