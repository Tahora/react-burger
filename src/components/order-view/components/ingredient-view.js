import styles from "./ingredient-view.module.css";
import { IngredientIcon } from "./ingredient-icon";
import { PriceView } from "./price-view";
import PropTypes from "prop-types";

export function IngredientView(props) {
  const { image, name, countPrice } = props;
  return (
    <div className={styles.container}>
      <IngredientIcon image={image} />
      <p className={`text text_type_main-default`}>{name}</p>
      <div className={styles.priceArea}>
        <PriceView text={countPrice} />
      </div>
    </div>
  );
}

IngredientView.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  countPrice: PropTypes.string.isRequired,
};
