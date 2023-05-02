import React, { FormEvent, useEffect } from "react";
import styles from "./common.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  clearResetPasswordResult,
  setPassword,
} from "../services/actions/authorization";
import { useForm } from "../hooks/use-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

export const ResetPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { form, onFormChange } = useForm(dispatch);
  const { password, token } = form;
  const { setPasswordRequest, setPasswordResult } = useAppSelector(
    (state) => state.register
  );

  useEffect(() => {
    return () => {
      dispatch(clearResetPasswordResult());
    };
  }, []);

  if (state?.from?.pathname !== "/forgot-password") {
    navigate("/");
  }

  if (setPasswordResult) {
    navigate("/");
  }

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setPassword({ password, token }));
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
