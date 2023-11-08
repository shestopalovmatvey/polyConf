import { useNavigate } from 'react-router-dom'
import style from './HomePage.module.scss'
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IconContext } from "react-icons";
import {FiPlusCircle} from 'react-icons/fi'
import { DateTimeDisplay } from '../../components/DateTimeDisplay/DateTimeDisplay';
import { nanoid } from 'nanoid'

export default function HomePage() {
    const navigate = useNavigate()

    const handlerClickConnectBtn = () => {
        navigate('/join')
    }

    const handlerClickNewChat = () => {
        navigate(`/room/${nanoid(10)}`)
    }

    return (
        <div className={style.container}>
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
            </section>
            

            <DateTimeDisplay />
        </div>
    )
}
