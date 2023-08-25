import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  const [active, setActive] = useState(false);
  return (
    <header className='header'>
      <NavLink
        to='/techoavia-roman'
        className={active ? 'header__text active' : 'header__text'}
      >
        Форма
      </NavLink>
      <NavLink
        to='/update'
        className={active ? 'header__text active' : 'header__text'}
      >
        Обновление информации
      </NavLink>
    </header>
  );
}

export default Header;
