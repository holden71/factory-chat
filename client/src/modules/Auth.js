import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/auth_background.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [signUP, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {

        if (signUP && (form.confirmPassword !== form.password)) {
            alert('Пароли не совпадают!\nПроверьте правильность ввода.');

            return 0;
        }

        e.preventDefault();

        const { username, password, avatarURL } = form;

        //const URL = 'https://localhost:5000/auth';
        const URL = 'https://factory-chat.herokuapp.com/auth';

        try {

            const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${signUP ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, avatarURL,
            });

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if (signUP) {
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();

        } catch (e) {
            if (e.response.status !== 200) {
                alert('Неверный пользователь или пароль!')
            }
        }

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth">
            <div className="auth_fields">
                <div className="auth_fields-content">
                    <p>{signUP ? 'Регистрация' : 'Авторизация'}</p>
                    <form onSubmit={handleSubmit}>
                        {signUP && (
                            <div className="auth_fields-content_input">
                                <label htmlFor="fullName">Ваше имя</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder="Введите имя"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth_fields-content_input">
                            <label htmlFor="username">Логин</label>
                            <input
                                name="username"
                                type="text"
                                placeholder="Введите логин"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {
                        }
                        {signUP && (
                            <div className="auth_fields-content_input">
                                <label htmlFor="avatarURL">Ссылка на аватар</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder="Введите URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth_fields-content_input">
                            <label htmlFor="password">Пароль</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Введите пароль"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {signUP && (
                            <div className="auth_fields-content_input">
                                <label htmlFor="confirmPassword">Подтверждение пароля</label>
                                <label> </label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Введите пароль"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth_fields-content_button">
                            <button>{signUP ? "Зарегистрироваться" : "Войти"}</button>
                        </div>
                    </form>

                    <div className="auth_fields-account">
                        <p>
                            {signUP
                                ? "Уже есть аккаунт? "
                                : "Не удаётся войти? "
                            }
                            <span onClick={switchMode}>
                                {signUP ? 'Войти' : 'Зарегистрировать аккаунт'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth
