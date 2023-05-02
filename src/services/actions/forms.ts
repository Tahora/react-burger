export const FORM_SET_VALUE: "FORM_SET_VALUE" = "FORM_SET_VALUE";
export const FORM_RESET: "FORM_RESET" = "FORM_RESET";

export type TFormActions = ISetFormValueAction | IResetFormAction;

export interface ISetFormValueAction {
  readonly type: typeof FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export interface IResetFormAction {
  readonly type: typeof FORM_RESET;
}

export const setFormValue = (
  field: string,
  value: string
): ISetFormValueAction => ({
  type: FORM_SET_VALUE,
  field,
  value,
});

export const resetForm = (): IResetFormAction => ({
  type: FORM_RESET,
});
