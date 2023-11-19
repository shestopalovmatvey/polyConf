import { FC } from 'react'
import style from './Header.module.scss'
import { IconContext } from 'react-icons'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import $api from '../../http'
import { logoutUser } from '../../redux/user/user.slice'

export const Header: FC = () => {
    const {user} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleClickLogoutBtn = async () => {
        try {
            const response = await $api.post('/logout', {email: user.user.email, password: user.user.password})
            console.log(response)
            localStorage.removeItem('token')
            dispatch(logoutUser())
        } catch (e){
            console.log(e)
        }
    } 
    return (
        <header className={style.header}>
            <div className={style.header__logo}>
                <Link to={"/"}>
                    <h2 className={style.logo__text}>PolyConf</h2>
                    <IconContext.Provider value={{className: `${style.logo}`}}>
                        <>
                            <BsFillCameraVideoFill />
                        </>
                    </IconContext.Provider>
                </Link>
            </div>

            <nav className={style.header__nav}>
                <ul>
                    {user.isAuth && <li onClick={handleClickLogoutBtn}>
                        <button className={style.logout}>Выйти</button>
                    </li>}
                    {!user.isAuth && <li>
                        <Link to={'/login'} className={style.login}>
                            <p>Войти</p>
                        </Link>
                    </li>}
                </ul>
            </nav>
        </header>
    )
}
