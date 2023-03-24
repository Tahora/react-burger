import { FORM_SET_VALUE, FORM_RESET } from "../actions/forms";

export const initStateForms = {
  email: "",
  name: "",
  password: "",
  token: "",
  error: false,
};

export const formReducer = (state = initStateForms, action) => {
  switch (action.type) {
    case FORM_SET_VALUE: {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case FORM_RESET: {
      return {
        ...state,
        ...initStateForms,
      };
    }
    default: {
      return state;
    }
  }
};
