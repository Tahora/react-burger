import React from 'react';
import styles from './burgerConstructor.module.css';
import commonStyles from '../common.module.css';
import {ConstructorItem} from '../constructorItem/constructorItem';
import {OrderTotal} from '../orderTotal/orderTotal';
import {OrderDetails} from '../orderDetails/orderDetails';
import {Modal} from '../modal/modal';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';


export function BurgerConstructor(props) {
    const mainItems = props.items;
    const total = (props.bun ? props.bun.price * 2 : 0) +
    props.items ? props.items.reduce((prevSum, i) => {
        return prevSum + i.price;
    }, 0) : 0;

    const [modalState, setModalState] = React.useState();

    function getOrderId(someParameter) {
        return "034526";
    }

    const showModal = (someParameter) => (e) => {
        setModalState(getOrderId(someParameter));
    }

    const hideModal = (e) => {
        setModalState();
    }


    return (
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            {props.bun &&
                <ConstructorItem
                    type="top"
                    isLocked={true}
                    text={`${props.bun.name} (верх)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image}
                />}

            <div className={`${styles.burgerConstructorMain} ${commonStyles.scrolledArea} mt-4 mb-4`}>
                {mainItems.map((i) => {
                    return (<ConstructorItem
                        key={i._id}
                        isLocked={false}
                        text={i.name}
                        price={i.price}
                        thumbnail={i.image}
                    />);
                })}

            </div>
            {props.bun &&
                <ConstructorItem
                    type="bottom"
                    isLocked={true}
                    text={`${props.bun.name} (низ)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image}
                />}
            <div className='mt-10 mr-4'>
                <OrderTotal total={total} showModal={showModal("test")}/>
            </div>
            {modalState &&
                (<Modal hideFunction={hideModal}>
                    <OrderDetails id={modalState}/>
                </Modal>)
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    bun: PropTypes.shape(ingredientType),
    items: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}
