import { FC } from 'react'
import style from './LoginPage.module.scss'
import { Header } from '../../components/Header/Header'
import { Link } from 'react-router-dom'

export const LoginPage: FC = () => {
  return (
    <div className={style.container}>
        <Header />
        <section className={style.section}>
            <form className={style.form}>
              <div className={style.title__form}>
                  <h3>Вход</h3>
              </div>
              <div className={`${style.input__field} ${style.email__field}`}>
                <p>Email:</p>
                <input type="email" placeholder='Ваш email' className={`${style.input} ${style.input__email}`}/>
              </div>
              <div className={`${style.input__field} ${style.input__field}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Ваш пароль' className={`${style.input}`}/>
              </div>
              <button type='submit' className={style.submit__btn}>
                  <p>Войти</p>
              </button>

              <p className={style.no__acc}>У вас нет учетной записи? <Link>Зарегистрироваться</Link></p>
            </form>
        </section>
    </div>
  )
}
