import React from 'react';
import styles from './orderTotal.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";


export function OrderTotal(props) {

    return (
        <div className={`${styles.container}`}>
            <p className='text text_type_digits-medium'>{props.total ? props.total : 0}</p>
            <div className={`${styles.totalIconContainer} ml-2 mr-10`}>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={props.showModal}>
                Оформить заказ
            </Button>
        </div>

    )
}

OrderTotal.propTypes = {
    total: PropTypes.number,
    showModal: PropTypes.func
}
