import React, { useEffect } from "react";
import styles from "./common.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetForm, setFormValue } from "../services/actions/forms";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/actions/authorization";

export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = useSelector((state) => state.forms);
  const { registerRequest, user, registerFailed } = useSelector(
    (state) => state.register
  );
  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  const isLogged = !registerFailed && user?.email && user?.name;
  if (isLogged) {
    return navigate("/");
  }

  const onFormSubmit = (e) => {
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
}
