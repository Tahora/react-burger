import React, { useEffect, useState } from "react";
import styles from "./common.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetForm, setFormValue } from "../services/actions/forms";
import { resetPassword } from "../services/actions/authorization";
import { useDispatch, useSelector } from "react-redux";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { email } = useSelector((state) => state.forms);
  const { resetPasswordFailed, resetPasswordRequest, user } = useSelector(
    (state) => state.register
  );
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email)).then((res) => {
      if (!(resetPasswordFailed || resetPasswordRequest)) {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return navigate("/reset-password", { state: { from: "forgot-page" } });
  }

  if (user?.email && user?.name) {
    return navigate("/");
  }

  return (
    <form className={`${styles.container}`} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>

      <EmailInput
        onChange={(e) => onFormChange(e)}
        value={email}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass="pt-4 pb-4 mb-4"
        disabled={resetPasswordRequest}
      >
        Восстановить
      </Button>
      <div>
        <div className={`${styles.linkContainer} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link
            to="../login"
            className={`${styles.link} text text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </form>
  );
}
