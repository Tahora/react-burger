import React from 'react';
import styles from './app.module.css';
import {AppHeader} from "../appHeader/appHeader";
import {BurgerIngredients} from "../burgerIngredients/burgerIngredients";
import {BurgerConstructor} from "../burgerConstructor/burgerConstructor";
import { urlApi} from '../../utils/data';

export function App () {
    const [state, setState] = React.useState( {
        isLoading: false,
        hasError: false,
        data: []
    });



    React.useEffect(()=>{
        const getData =  async() => {
            setState({ data: [], hasError: false, isLoading: true });
               try {
                    const res =await fetch(urlApi);
                    const resdata =await res.json();
                    resdata.success?
                    setState({ hasError: false, data: resdata.data, isLoading: false }):
                        setState({ data:[], hasError: true, isLoading: false });
                } catch (err) {
                    setState({ data:[], hasError: true, isLoading: false });
                }
        };
            getData();
        }, []
    )


    return (
        <div  className={styles.app}>
            <AppHeader/>
            <main  className={styles.content}>
                {state.isLoading && 'Загрузка...'}
                {state.hasError && 'Произошла ошибка'}
                {!state.isLoading &&
                    !state.hasError &&
                    state.data.length &&
                    (<>
                        <BurgerIngredients burgerdata={state.data}/>
                        <BurgerConstructor bun={state.data.find((i)=>{return i.type=="bun"})} items={state.data}/>
                    </>)}

            </main>
        </div>
    )
}