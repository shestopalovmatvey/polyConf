import { FC, useState } from 'react'
import style from './SignUpPage.module.scss'
import { Header } from '../../components/Header/Header'
import { Link, useNavigate } from 'react-router-dom'
import $api from '../../http'
import { Modal } from '../../components/ModalComponent/ModalComponent'


interface IUserName {
  firstName: string,
  lastName: string
}

export const SignUpPage: FC = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<IUserName>({
    firstName: '',
    lastName: ''
  })
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const removeInputValue = () => {
    setEmail('')
    setPassword('')
    setUserName({
      firstName: '',
      lastName: ''
    })
  }

  const [modalActive, setModalActive] = useState(false)
  const [message, setMessage] = useState('');


  const sugnUp = async (email: string, password: string, userName: IUserName) => {
    try {
      
      const response = await $api.post('/registration', {email, password, userName: `${userName.firstName} ${userName.lastName}`})
      localStorage.setItem('token', response.data.accessToken)
      removeInputValue()
      setMessage("Вы успешно зарегистрировались!");
      setModalActive(true);
    } catch (e) {
      console.log(e)
      setMessage(e.response.data.message);
      setModalActive(true);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    sugnUp(email, password, userName)
  }


  return (
    <div className={style.container}>
        <Header />
        <section className={style.section}>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.title__form}>
                  <h3>Регистрация</h3>
              </div>
              <div className={`${style.input__field} ${style.userName__field}`}>
                <p>Имя:</p>
                <input type="text" placeholder='Введите имя' className={`${style.input} ${style.input__userName}`} value={userName.firstName} onChange={(e) => setUserName((prev) => ({...prev, firstName: e.target.value}))}/>
              </div>
              <div className={`${style.input__field} ${style.userLastName__field}`}>
                <p>Фамилия:</p>
                <input type="text" placeholder='Введите фамилию' className={`${style.input} ${style.input__userLastName}`} value={userName.lastName} onChange={(e) => setUserName((prev) => ({...prev, lastName: e.target.value}))}/>
              </div>
              <div className={`${style.input__field} ${style.email__field}`}>
                <p>Email:</p>
                <input type="email" placeholder='Введите email' className={`${style.input} ${style.input__email}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className={`${style.input__field} ${style.input__field}`}>
                <p>Пароль:</p>
                <input type="password" placeholder='Введите пароль' className={`${style.input}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <button type='submit' className={style.submit__btn} onClick={() => setModalActive(true)}>
                  <p>Зарегистрироваться</p>
              </button>

              <p className={style.no__acc}>У вас уже есть учетная запись? <Link to={'/login'}>Войти</Link></p>
            </form>
        </section>
        <Modal active={modalActive} setActive={setModalActive}>
          {message}
        </Modal>
    </div>
  )
}
