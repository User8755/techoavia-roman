import './Login.css';
import { EMAIL } from '../../untils/constants';

function Login() {
  return (
    <section className='section entry'>
      <div className='entry__container'>
        <h1 className='entry__title'>Вход</h1>
        <form className='entry__form'>
          <lable for='email' className='entry__form_lable'>
            Email
          </lable>
          <input
            className='entry__form_input'
            id='email'
            type='email'
            placeholder='example@mail.ru'
            pattern={EMAIL}
          ></input>
          <span className='input-error'>
            Введен некорректный адрес электронной почты
          </span>
          <lable for='password' className='entry__form_lable'>
            Пароль
          </lable>
          <input
            id='password'
            type='password'
            className='entry__form_input'
            minlength='8'
          />
          <span className='input-error'>Ошибка ввода пароля</span>
          <button className='button entry__button' type='submit'>
            Войти
          </button>
        </form>
        <div className='question__container'>
          <p className='question__text'>Забыли пароль?</p>
          <button className='question__button'>Напомнить</button>
        </div>
      </div>
    </section>
  );
}

export default Login;
