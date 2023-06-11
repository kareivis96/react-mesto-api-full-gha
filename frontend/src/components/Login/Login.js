import { useState } from 'react';
import * as auth from '../../utils/auth';

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.login(formValue.password, formValue.email)
      .then(res => {
        if (res.token) {
          setFormValue({ username: '', password: '' });
          localStorage.setItem('jwt', res.token);
          props.handleLogin();
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <main className="register">
      <h2 className="register__title">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <input className="register__input" name='email' required type='email' placeholder='Email' onChange={handleChange} />
        <input className="register__input" name='password' required type='password' placeholder='Пароль' onChange={handleChange} />
        <button type='submit' className="register__submit-button">Войти</button>
      </form>
    </main>
  )
}
export default Login;