import React, { useEffect } from "react";
import styles from "./common.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  resetPassword,
  clearResetPasswordResult,
} from "../services/actions/authorization";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../hooks/use-form";

// не могу понять почему компонент генерирует в консоли
//react-dom.development.js:86 Warning: Cannot update a component (`BrowserRouter`) while rendering a different component (`ForgotPasswordPage`). To locate the bad setState() call inside
// ведь setState() в нём не используется
export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { form, onFormChange } = useForm(dispatch);
  const { email } = form;

  const { resetPasswordRequest, resetPasswordResult } = useSelector(
    (state) => state.register
  );

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(email));
  };

  useEffect(() => {
    return () => {
      dispatch(clearResetPasswordResult());
    };
  }, []);

  if (resetPasswordResult) {
    navigate("/reset-password", { state: { from: location } });
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
