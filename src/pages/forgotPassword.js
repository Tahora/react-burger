import React from 'react';
import styles from "./common.module.css";
import {
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from 'react-router-dom';


export function ForgotPasswordPage() {
    return (
        <div className={`${styles.container}`}>
            <h1 className="text text_type_main-medium">
                Восстановление пароля
            </h1>

            <EmailInput
                //onChange={onChange}
                //value={value}
                name={'email'}
                placeholder="Укажите e-mail"
                isIcon={false}
                //extraClass="mb-2"
            />
            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="pt-4 pb-4 mb-4"
                //onClick={props.onClick}
            >Восстановить
            </Button>
            <div>
                <div className={`${styles.linkContainer} mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
                    <Link to="../login"   className={`${styles.link} text text_type_main-default`}>Войти</Link>
                </div>
            </div>
        </div>
    );
}
