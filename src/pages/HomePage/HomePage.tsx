import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function HomePage() {
    const [roomId, setRoomId] = useState<string | null>('')
    const navigate = useNavigate()
    return (
        <>
        <input type="text" onChange={(e) => setRoomId(e.currentTarget.value)}/>
        <button onClick={() => {
            navigate(`/room/${roomId}`)
            
        }}>Connect chat</button>
        </>
    )
}
