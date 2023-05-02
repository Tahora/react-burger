import { ChangeEvent, useEffect } from "react";
import { resetForm, setFormValue } from "../services/actions/forms";
import { TAppDispatch, useAppSelector } from "./redux";

export function useForm(dispatch: TAppDispatch) {
  const form = useAppSelector((state) => state.forms);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  return { form, onFormChange };
}
