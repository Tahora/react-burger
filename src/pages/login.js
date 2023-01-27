import React from 'react';
import styles from "./common.module.css";
import {
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';


export function LoginPage() {
    return (
        <div className={`${styles.container}`}>
            <h1 className="text text_type_main-medium">
                Вход
            </h1>

            <EmailInput
                //onChange={onChange}
                //value={value}
                name={'email'}
                placeholder="E-mail"
                isIcon={false}
                //extraClass="mb-2"
            />
            <PasswordInput
                //onChange={onChange}
                //value={value}
                name={'password'}
                // extraClass="mb-2"
            />
            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="pt-4 pb-4 mb-4"
                //onClick={props.onClick}
            >Войти
            </Button>
            <div>
            <div className={`${styles.linkContainer} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">Вы - новый пользователь?</p>
                <Link to="../register"   className={`${styles.link} text text_type_main-default`}>Зарегистрироваться</Link>
            </div>
            <div className={`${styles.linkContainer} mt-4`}>
                <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
                <Link to="../forgot-password"  className={`${styles.link} text text_type_main-default`}>Восстановить пароль</Link>
            </div>
            </div>
        </div>
    );
}
