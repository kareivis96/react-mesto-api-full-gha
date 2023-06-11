import logo from '../../images/logo_white.svg';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

function Header(props) {
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
    props.loggedIn.setLoggedIn(false);
    props.userInfo.setUserInfo({});
  }

  return (
    <header className="header position-center">
      <img src={logo} alt="логотип" className="header__logo" />
      <div className='header__text-container'>
        {props.userInfo.userInfo.email && <p className='header__mail'>{props.userInfo.userInfo.email}</p>}
        {
          props.loggedIn.loggedIn
            ? <button button onClick={signOut} className="header__link">Выйти</button>
            : <Routes>
              <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
              <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
            </Routes>
        }
      </div>
    </header >
  )
}
export default Header;