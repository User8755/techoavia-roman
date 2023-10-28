import React from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

function Registration() {
  return (
    <section className='section entry'>
      <div className='entry__container'>
        <h1 className='entry__title'>Регистрация</h1>
        <form className='entry__form'>
          <lable for='name' className='entry__form_lable'>
            Имя
          </lable>
          <input
            className='entry__form_input'
            id='name'
            placeholder='Иван Иванович'
          ></input>
          <span className='input-error'></span>
          <lable for='surname' className='entry__form_lable'>
            Фамилия
          </lable>
          <input
            className='entry__form_input'
            id='surname'
            placeholder='Иванов'
          ></input>
          <span className='input-error'></span>
          <lable for='email' className='entry__form_lable'>
            Email
          </lable>
          <input
            className='entry__form_input'
            id='email'
            type='email'
            placeholder='example@mail.ru'
          ></input>
          <span className='input-error'></span>
          <lable for='password' className='entry__form_lable'>
            Пароль
          </lable>
          <input id='password' type='password' className='entry__form_input' />
          <span className='input-error'></span>
          <button className='button entry__button' type='submit'>
            Зарегистрироваться
          </button>
        </form>
        <div className='question__container'>
          <p className='question__text'>Уже зарегистрированы?</p>
          <Link to='/login' className='question__button registration'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Registration;
