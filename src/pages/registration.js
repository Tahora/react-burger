import React from 'react';
import styles from "./common.module.css";
import {
    Input,
    EmailInput,
    PasswordInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Navigate } from 'react-router-dom';

export function RegistrationPage() {
        return (
            <div className={`${styles.container}`}>
                <h1 className="text text_type_main-medium">
                    Регистрация
                </h1>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    //onChange={e => setValue(e.target.value)}
                    //icon={'CurrencyIcon'}
                    //value={value}
                    name={'name'}
                    error={false}
                    //ref={inputRef}
                    //onIconClick={onIconClick}
                    //errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />
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
                >Зарегистрироваться
                </Button>
                <div className={`${styles.linkContainer} mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
                    <a  href="#" className={`${styles.link} text text_type_main-default`}>Войти</a>
                </div>
            </div>
        );
    }
