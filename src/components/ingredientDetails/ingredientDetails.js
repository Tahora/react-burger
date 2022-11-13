import React from 'react';
import styles from './ingredientDetails.module.css';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';


export function IngredientDetails(props) {

    const {name, proteins, fat, carbohydrates, calories, image_large} = props.data;

    return (
        <div className={styles.ingridientDetails}>
            <h1 className={`${styles.header} text text_type_main-large`}>Детали ингредиента</h1>
            <img src={image_large} alt={name}/>
            <p className="text text_type_main-medium mt-4 mb-8">{name}</p>
            <div className={`${styles.nutricionGrid} mb-5`}>
                <p className="text text_type_main-default">Калории,ккал</p>
                <p className="text text_type_main-default">Белки, г</p>
                <p className="text text_type_main-default">Жиры, г</p>
                <p className="text text_type_main-default">Углеводы, г</p>
                <p className="text text_type_digits-default">{calories}</p>
                <p className="text text_type_digits-default">{proteins}</p>
                <p className="text text_type_digits-default">{fat}</p>
                <p className="text text_type_digits-default">{carbohydrates}</p>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    data: PropTypes.shape(ingredientType)
}
