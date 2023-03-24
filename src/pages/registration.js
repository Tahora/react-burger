import React, { useEffect } from "react";
import styles from "./common.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../services/actions/authorization";
import { setFormValue, resetForm } from "../services/actions/forms";

export function RegistrationPage() {
  const dispatch = useDispatch();

  const { name, email, password } = useSelector((state) => state.forms);
  const { registerRequest, user } = useSelector((state) => state.register);

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
    dispatch(registerUser(email, password, name));
  };

  if (user?.email && user?.name) {
    return <Navigate to={"/"} />;
  }

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
        isIcon={false}
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
}

