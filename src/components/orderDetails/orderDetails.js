import React from 'react';
import styles from './orderDetails.module.css';
import graphics from '../../images/graphics.svg';
import {OrderContext} from '../../services/appContext';


export function OrderDetails() {
    const [state] = React.useContext(OrderContext);


    return (
        <div className={`${styles.orderDetails} mt-20 mb-20`}>
            <p className={`text ${state.isLoading ? 'text_type_main-medium' : ' text_type_digits-large'}`}>
                {state.isLoading && 'Заказ формируется...'}
                {(state.hasError || (state.data && !state.data.success)) && 'Произошла ошибка'}
                {!state.isLoading &&
                    !state.hasError &&
                    state.data && state.data.success &&
                    state.data.order?.number}

            </p>
            <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
            <img className={styles.image} src={graphics} alt="ok"/>
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной
                станции</p>
        </div>
    )
}


