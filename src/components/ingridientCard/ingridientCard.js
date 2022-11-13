import React from 'react';
import styles from './ingridientCard.module.css';
import { CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


export function IngridientCard (props){


    return (
        <div  className={styles.ingridientCard} onClick={props.showModal}>
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

IngridientCard.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    count: PropTypes.number,
    showModal: PropTypes.func
}