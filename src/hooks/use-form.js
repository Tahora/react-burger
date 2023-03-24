import { useSelector } from "react-redux";
import { useEffect } from "react";
import { resetForm, setFormValue } from "../services/actions/forms";

export function useForm(dispatch) {
  const form = useSelector((state) => state.forms);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  return { form, onFormChange };
}
