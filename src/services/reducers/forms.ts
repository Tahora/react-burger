import { FORM_SET_VALUE, FORM_RESET, TFormActions } from "../actions/forms";

export interface IStateForms {
  email: string;
  name: string;
  password: string;
  token: string;
  error: boolean;
}

export const initStateForms: IStateForms = {
  email: "",
  name: "",
  password: "",
  token: "",
  error: false,
};

export const formReducer = (state = initStateForms, action: TFormActions) => {
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
