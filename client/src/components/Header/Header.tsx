import { FC } from 'react'
import style from './Header.module.scss'
import { IconContext } from 'react-icons'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const Header: FC = () => {
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
                    <li>
                        <Link to={'/login'} className={style.login}>
                            <p>Войти</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
