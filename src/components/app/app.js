import React from 'react';
import styles from './app.module.css';
import {AppHeader} from "../appHeader/appHeader";
import {BurgerIngredients} from "../burgerIngredients/burgerIngredients";
import {BurgerConstructor} from "../burgerConstructor/burgerConstructor";
import {getIngridients, getData} from '../../utils/api';
import {IngridientsContext} from '../../services/appContext';

export function App() {
    const ingridientsState = React.useState({
        isLoading: false,
        hasError: false,
        data: []
    });
    const [state] = ingridientsState;

    React.useEffect(() => {
            getData(getIngridients, null, ingridientsState);
        }, []
    )


    return (
        <div className={styles.app}>
            <AppHeader/>
            <IngridientsContext.Provider value={ingridientsState}>
                <main className={styles.content}>
                    {state.isLoading && 'Загрузка...'}
                    {state.hasError && 'Произошла ошибка'}
                    {!state.isLoading &&
                        !state.hasError &&
                        state.data?.data?.length &&
                        (<>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </>)}

                </main>
            </IngridientsContext.Provider>
        </div>
    )
}
