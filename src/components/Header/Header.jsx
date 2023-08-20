import { NavLink } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <header className='header'>
      <NavLink to='/techoavia-roman'>Форма</NavLink>
      <NavLink to='/update'>Обновление информации</NavLink>
    </header>
  );
}

export default Header;
