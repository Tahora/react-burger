import React, { FormEvent } from "react";
import styles from "./common.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { loginUser } from "../services/actions/authorization";
import { useForm } from "../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, onFormChange } = useForm(dispatch);
  const { email, password } = form;

  const { registerRequest } = useAppSelector((state) => state.register);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <form onSubmit={onFormSubmit} className={`${styles.container}`}>
      <h1 className="text text_type_main-medium">Вход</h1>

      <EmailInput
        onChange={(e) => onFormChange(e)}
        value={email}
        name={"email"}
        placeholder="E-mail"
      />
      <PasswordInput
        onChange={(e) => onFormChange(e)}
        value={password}
        name={"password"}
      />
      <Button
        htmlType="submit"
        type="primary"
        size="large"
        extraClass="pt-4 pb-4 mb-4"
        disabled={registerRequest}
      >
        Войти
      </Button>
      <div>
        <div className={`${styles.linkContainer} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link
            to="../register"
            className={`${styles.link} text text_type_main-default`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={`${styles.linkContainer} mt-4`}>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </p>
          <Link
            to="../forgot-password"
            className={`${styles.link} text text_type_main-default`}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </form>
  );
};
