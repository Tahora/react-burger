import React, {useReducer, useEffect, useMemo} from 'react';
import styles from './burgerConstructor.module.css';
import commonStyles from '../common.module.css';
import {ConstructorItem} from '../constructorItem/constructorItem';
import {OrderTotal} from '../orderTotal/orderTotal';
import {OrderDetails} from '../orderDetails/orderDetails';
import {Modal} from '../modal/modal';
import {IngridientsContext, OrderContext} from '../../services/appContext';
import {getData, getOrderId} from '../../utils/api';


export function BurgerConstructor() {
    const total = (bun, items) => {
        return ((bun ? (bun.price * 2) : 0) +
            (items ? items.reduce((prevSum, i) => {
                return prevSum + i.price;
            }, 0) : 0))
    };


    const [items] = React.useContext(IngridientsContext);
    const orderState = React.useState({
        isLoading: false,
        hasError: false,
        data: ''
    });

    function reducer(state, action) {
        return total(action.bun, action.items);
    }

    const [stateTotal, dispatch] = useReducer(reducer, 0);


    const allbuns = items.data.data.filter((i) => {
        return i.type == "bun"
    });
    const bun = allbuns[Math.floor(Math.random() * allbuns.length)];
    const allItems = items.data.data.filter((i) => {
        return i.type != "bun"
    });
    const mainItems = useMemo(() => {
        let itemsArray = [];
        for (let i = 0; i <= Math.random() * allItems.length; i++) {//
            const filteredItems = allItems.filter((ai) => {
                return !itemsArray.some((item) => {
                    return item._id == ai._id
                })
            });
            itemsArray.push(filteredItems[Math.floor(Math.random() * filteredItems.length)]);
        }
        return itemsArray;
    }, []);


    useEffect(() => {
        dispatch({bun: bun, items: mainItems})
    }, [JSON.stringify(mainItems)]);


    const [modalState, setModalState] = React.useState();

    const showModal = (ingridientsId) => (e) => {
        getData(getOrderId, ingridientsId, orderState);
        setModalState(true);
    }

    const hideModal = (e) => {
        setModalState();
    }


    return (
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            {bun &&
                <ConstructorItem
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
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
            {bun &&
                <ConstructorItem
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />}
            <div className='mt-10 mr-4'>
                <OrderTotal total={stateTotal} showModal={showModal([...mainItems.map((i) => {
                    return i._id
                }), bun._id, bun._id])}/>
            </div>
            {modalState &&
                (<OrderContext.Provider value={orderState}>
                    <Modal hideFunction={hideModal}>
                        <OrderDetails/>
                    </Modal>
                </OrderContext.Provider>)
            }
        </section>
    )
}

