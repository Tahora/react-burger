import React, { FormEvent } from "react";
import styles from "./common.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerUser } from "../services/actions/authorization";
import { useForm } from "../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { form, onFormChange } = useForm(dispatch);
  const { name, email, password } = form;
  const { registerRequest } = useAppSelector((store) => store.register);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  };

  return (
    <form className={`${styles.container}`} onSubmit={onFormSubmit}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => onFormChange(e)}
        value={name}
        name={"name"}
        size={"default"}
        extraClass="ml-1"
      />
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
        Зарегистрироваться
      </Button>
      <div className={`${styles.linkContainer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Link
          to="../login"
          className={`${styles.link} text text_type_main-default`}
        >
          Войти
        </Link>
      </div>
    </form>
  );
};
