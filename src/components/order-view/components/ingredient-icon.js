import styles from "./ingredient-icon.module.css";
import PropTypes from "prop-types";

export function IngredientIcon(props) {
  const t = (
    <div
      style={{ zIndex: props?.index || 0 }}
      className={`${styles.iconContainer}`}
    >
      <img className={`${styles.icon}`} src={props.image} />
      {props?.hidedCount > 0 && (
        <div
          className={`${styles.icon} ${styles.overlay} text text_type_main-small`}
        >
          {`+${props?.hidedCount}`}
        </div>
      )}
    </div>
  );

  return t;
}

IngredientIcon.propTypes = {
  index: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  hidedCount: PropTypes.number.isRequired,
};
