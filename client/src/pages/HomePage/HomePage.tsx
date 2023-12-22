import { useNavigate } from 'react-router-dom'
import style from './HomePage.module.scss'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IconContext } from "react-icons";
import {FiPlusCircle} from 'react-icons/fi'
import { DateTimeDisplay } from '../../components/DateTimeDisplay/DateTimeDisplay';
import { nanoid } from 'nanoid'
import { Header } from '../../components/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function HomePage() {
    const user = useSelector((store: RootState) => store.user)
    const navigate = useNavigate()

    const handlerClickConnectBtn = () => {
        if (user.isAuth) {
            navigate('/join')
        } else {
            navigate(`/login`)
        }
        
    }

    const handlerClickNewChat = () => {
        if (user.isAuth) {
            navigate(`/room/${nanoid(10)}`)
        } else {
            navigate(`/login`)
        }
    }

    return (
        <div className={style.container}>
            <Header />
            <section className={style.section__btn}>
                <div className={style.btn__container}>
                    <button className={[style.btn__chat, style.btn__newChat,].join(' ')} onClick={handlerClickNewChat}>
                        <IconContext.Provider value={{className: 'btn__connetChat__icon'}}>
                            <>
                                <BsFillCameraVideoFill />
                            </>
                        </IconContext.Provider>
                    </button>
                    <span>Новая конференция</span>
                </div>

                <div className={style.btn__container}>
                    <button className={[style.btn__chat, style.btn__connectChat,].join(' ')} onClick={handlerClickConnectBtn}>
                        <IconContext.Provider value={{className: 'btn__connetChat__icon'}}>
                            <>
                                <FiPlusCircle />
                            </>
                        </IconContext.Provider>
                    </button>
                    <span>Подключиться</span>
                </div>

                <DateTimeDisplay />
            </section>
        </div>
    )
}