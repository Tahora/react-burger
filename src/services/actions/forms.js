export const FORM_SET_VALUE = "FORM_SET_VALUE";
export const FORM_RESET = "FORM_RESET";

export const setFormValue = (field, value) => ({
  type: FORM_SET_VALUE,
  field,
  value,
});

export const resetForm = () => ({
  type: FORM_RESET,
});
