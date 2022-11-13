import React from 'react';
import styles from './orderDetails.module.css';
import graphics from '../../images/graphics.svg';
import PropTypes from "prop-types";






export function OrderDetails (props) {


    return (
        <div className={`${styles.orderDetails} mt-20 mb-20`}>
            <p  className="text text_type_digits-large">{props.id}</p>
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <img  className={styles.image} src={graphics} alt="ok"/>
            <p  className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

OrderDetails.propTypes = {
    id:PropTypes.string
}