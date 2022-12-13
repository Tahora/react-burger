import PropTypes from "prop-types";

export const ingredientType = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
};

export const orderStateType = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.shape({ number: PropTypes.number }).isRequired,
  }),
};
