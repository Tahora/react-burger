import React from 'react';
import styles from './burgerConstructor.module.css';
import commonStyles from '../common.module.css';
import { ConstructorItem} from '../constructorItem/constructorItem';
import {OrderTotal} from '../orderTotal/orderTotal';
import {OrderDetails} from '../orderDetails/orderDetails';
import {Modal} from "../modal/modal";
import PropTypes from 'prop-types';




export function BurgerConstructor (props) {
    const mainItems=props.items;
    const total=(props.bun?props.bun.price*2:0)+
        props.items? props.items.reduce((prevSum, i)=>{return prevSum+i.price;},0) : 0;

    const [modalstate, setModalState]=React.useState();

    function getOrderId(someparameter)
    {
        return "034526";
    }

    const showModal=(someparameter)=>(e)=>
    {
        setModalState(getOrderId(someparameter));
    }

    const hideModal=(e)=>
    {
        setModalState();
    }


    return (
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            {props.bun&&
                <ConstructorItem
                    type="top"
                    isLocked={true}
                    text={`${props.bun.name} (верх)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image}
                />}

            <div className={`${styles.burgerConstructorMain} ${commonStyles.scrolledArea} mt-4 mb-4`}>
                {mainItems.map((i, ind)=>
                {
                    return (<ConstructorItem
                        key={ind}
                        isLocked={false}
                        text={i.name}
                        price={i.price}
                        thumbnail={i.image}
                    />);
                })}

            </div>
            {props.bun&&
                <ConstructorItem
                    type="bottom"
                    isLocked={true}
                    text={`${props.bun.name} (низ)`}
                    price={props.bun.price}
                    thumbnail={props.bun.image}
                />}
            <div  className='mt-10 mr-4'>
            <OrderTotal total={total} showModal={showModal("test")}/>
            </div>
            {modalstate&&
                (<Modal hideFunction={hideModal}>
                    <OrderDetails id={modalstate}>

                    </OrderDetails>
                </Modal>)
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
bun: PropTypes.shape({
    _id:PropTypes.string,
    type:PropTypes.string,
    proteins:PropTypes.number,
    fat:PropTypes.number,
    carbohydrates:PropTypes.number,
    calories:PropTypes.number,
    name:PropTypes.string,
    price:PropTypes.number,
    image:PropTypes.string,
    image_mobile:PropTypes.string,
    image_large:PropTypes.string,
    __v:PropTypes.number
}),
    items:PropTypes.array
}