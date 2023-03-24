import React, { useEffect } from "react";
import styles from "./profileInfo.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, setFormValue } from "../../services/actions/forms";
import { trySetUserData } from "../../services/actions/authorization";

export function ProfileInfo() {
  const dispatch = useDispatch();
  const { name: userName = "", email: userEmail = "" } = {
    ...useSelector((state) => state.register.user),
  };
  const { password, name, email } = { ...useSelector((state) => state.forms) };

  useEffect(() => {
    dispatch(setFormValue("name", userName));
    dispatch(setFormValue("email", userEmail));
    return () => {
      dispatch(resetForm());
    };
  }, [userName, userEmail]);

  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(trySetUserData({ errName: "" }));
  };

  const onCancel = () => {
    dispatch(setFormValue("name", userName));
    dispatch(setFormValue("email", userEmail));
    dispatch(setFormValue("password", ""));
  };

  const buttons = userName !== name || userEmail !== email;

  return (
    <form className={`${styles.container}`} onSubmit={onFormSubmit}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => onFormChange(e)}
        value={name}
        name={"name"}
        icon={"EditIcon"}
        extraClass="ml-1 pt-0"
      />

      <Input
        onChange={(e) => onFormChange(e)}
        value={email}
        type={"email"}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        icon={"EditIcon"}
      />
      <Input
        onChange={(e) => onFormChange(e)}
        value={password}
        type={"password"}
        placeholder="Пароль"
        name={"password"}
        icon={"EditIcon"}
      />
      {buttons && (
        <div className={`${styles.buttons}`}>
          <p
            className={`${styles.button} text text_type_main-default`}
            onClick={onCancel}
          >
            Отмена
          </p>
          <Button htmlType="submit" type="primary">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
