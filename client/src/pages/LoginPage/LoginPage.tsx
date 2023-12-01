import { FC, FormEvent, useState } from 'react'
import style from './LoginPage.module.scss'
import { Header } from '../../components/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import $api from '../../http'
import { IAuthResponse } from '../../models/response/AuthResponse'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/user/user.slice'
import { Modal } from '../../components/ModalComponent/ModalComponent'

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const [modalActive, setModalActive] = useState(false)
  const [message, setMessage] = useState('');


  const login = async (email: string, password: string) => {
    try {
      const response = await $api.post<IAuthResponse>('/login', {email, password})
      localStorage.setItem('token', response.data.accessToken)
      dispatch(setUser(response.data.user))
      navigate('/')
    } catch (e) {
      console.log(e)
      setMessage(e.response.data.message);
      setModalActive(true);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    
    login(email, password)
  }

  return (
    <div className={style.container}>
        <Header />
        <section className={style.section}>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.title__form}>
                  <h3>Вход</h3>
              </div>
              <div className={`${style.input__field} ${style.email__field}`}>
                <p>Email:</p>
                <input type="email" placeholder='Ваш email' autoComplete="on" className={`${style.input} ${style.input__email}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className={`${style.input__field} ${style.input__field}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Ваш пароль' className={`${style.input}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type='submit' className={style.submit__btn}>
                  <p>Войти</p>
              </button>

              <p className={style.no__acc}>У вас нет учетной записи? <Link to={'/signUp'}>Зарегистрироваться</Link></p>
            </form>
        </section>
        <Modal active={modalActive} setActive={setModalActive}>
          {message}
        </Modal>
    </div>
  )
}
