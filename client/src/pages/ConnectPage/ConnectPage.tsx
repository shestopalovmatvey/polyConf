import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from './ConnectPage.module.scss'

export const ConnectPage: FC = () => {
    const navigate = useNavigate()
    const [roomId, setRoomId] = useState('')

    const handlerInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setRoomId(evt.target.value)
    }

    const handlerJoinBtn = () => {
        if (roomId) {
            navigate(`/room/${roomId}`)
        }
    }
    return (
        <div className={style.connectPage}>
            <div className={style.container}>
                <h3 className={style.connectTitle}>Присоединиться к конференции</h3>
                <input className={style.cennect__meetingId} type="text" placeholder='Введите идентификатор конференции' value={roomId} onChange={handlerInput}/>
                <div className={style.connect__btn}>
                    <button className={[style.btn, style.exit__btn,].join(' ')} onClick={() => navigate('/')}>Отмена</button>
                    <button className={[style.btn, style.join__btn,].join(' ')} onClick={handlerJoinBtn}>Присоединиться</button>
                </div>
            </div>
        </div>
    )
}