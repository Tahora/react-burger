import React, { useEffect } from "react";
import styles from "./profile-info.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {  setFormValue } from "../../services/actions/forms";
import { trySetUserData } from "../../services/actions/authorization";
import { useForm } from "../../hooks/use-form";

export function ProfileInfo() {
  const dispatch = useDispatch();

  const { name: userName = "", email: userEmail = "" } = {
    ...useSelector((state) => state.register.user),
  };
  const { form, onFormChange } = useForm(dispatch);
  const { password, name, email } = form;

  useEffect(() => {
    dispatch(setFormValue("name", userName));
    dispatch(setFormValue("email", userEmail));
  }, [userName, userEmail]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const fields={};
    if(userName!==name) fields.name=name;
    if(userEmail!==email) fields.email=email;
    fields.password=password;
    dispatch(trySetUserData({fields, errName: "" }));
  };

  const onCancel = () => {
    dispatch(setFormValue("name", userName));
    dispatch(setFormValue("email", userEmail));
    dispatch(setFormValue("password", ""));
  };

  const buttons = userName !== name || userEmail !== email ;

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
