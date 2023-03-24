import React, { useEffect, useState } from "react";
import styles from "./common.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setFormValue } from "../services/actions/forms";
import { setPassword } from "../services/actions/authorization";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  let navigate = useNavigate();
  const { password, token } = useSelector((state) => state.forms);
  const { setPasswordFailed, setPasswordRequest, user } = useSelector(
    (state) => state.register
  );
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  if (state?.from !== "forgot-page") {
    return navigate("/");
  }

  if (redirect || (user?.email && user?.name)) {
    return navigate("/");
  }

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setPassword({ password, token })).then((res) => {
      if (!(setPasswordFailed || setPasswordRequest)) {
        setRedirect(true);
      }
    });
  };

  return (
    <form className={`${styles.container}`} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <PasswordInput
        onChange={(e) => onFormChange(e)}
        value={password}
        name={"password"}
        placeholder={"Введите новый пароль"}
      />

      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        onChange={(e) => onFormChange(e)}
        value={token}
        name={"token"}
        error={false}
        size={"default"}
        extraClass="ml-1"
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass="pt-4 pb-4 mb-4"
        disabled={setPasswordRequest}
      >
        Сохранить
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
