import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';

function Register(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.password, formValue.email)
      .then(res => {
        if (res.data) {
          navigate('/sign-in', { replace: true });
          props.setInfoTooltip({ isOpened: true, sucsess: true });
        } else {
          props.setInfoTooltip({ isOpened: true, sucsess: false });
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <main className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input className="register__input" name='email' required type='email' placeholder='Email' onChange={handleChange} />
        <input className="register__input" name='password' required type='password' placeholder='Пароль' onChange={handleChange} />
        <button type='submit' className="register__submit-button">Зарегистрироваться</button>
      </form>
      <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
    </main>
  )
}
export default Register;