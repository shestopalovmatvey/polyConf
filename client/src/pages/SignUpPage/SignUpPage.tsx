import { FC } from 'react'
import style from './SignUpPage.module.scss'
import { Header } from '../../components/Header/Header'
import { Link } from 'react-router-dom'

export const SignUpPage: FC = () => {
  return (
    <div className={style.container}>
        <Header />
        <section className={style.section}>
            <form className={style.form}>
              <div className={style.title__form}>
                  <h3>Регистрация</h3>
              </div>
              <div className={`${style.input__field} ${style.userName__field}`}>
                <p>Имя:</p>
                <input type="email" placeholder='Введите имя' className={`${style.input} ${style.input__userName}`}/>
              </div>
              <div className={`${style.input__field} ${style.userLastName__field}`}>
                <p>Фамилия:</p>
                <input type="email" placeholder='Введите фамилию' className={`${style.input} ${style.input__userLastName}`}/>
              </div>
              <div className={`${style.input__field} ${style.email__field}`}>
                <p>Email:</p>
                <input type="email" placeholder='Введите email' className={`${style.input} ${style.input__email}`}/>
              </div>
              <div className={`${style.input__field} ${style.input__field}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Введите пароль' className={`${style.input}`}/>
              </div>
              <button type='submit' className={style.submit__btn}>
                  <p>Зарегистрироваться</p>
              </button>

              <p className={style.no__acc}>У вас уже есть учетная запись? <Link to={'/login'}>Войти</Link></p>
            </form>
        </section>
    </div>
  )
}
