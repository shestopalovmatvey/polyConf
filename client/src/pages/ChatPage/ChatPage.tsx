import {useParams} from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { nanoid } from 'nanoid';
import style from './ChatPage.module.scss'

const APP_ID = 1812404065
const ServerSecret = 'b662c4c9450632e79a2711a83f12c8d5'

export default function ChatPage() {
    const { roomId } = useParams()
    const myMeeting = async (element: HTMLDivElement) => {
         const appID = APP_ID;
         const serverSecret = ServerSecret;
         const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId as string,  Date.now().toString(),  `User-${nanoid(6)}`);

         const zp = ZegoUIKitPrebuilt.create(kitToken);

         zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url: `http://localhost:5173/room/${roomId}`,
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showTurnOffRemoteCameraButton: true,
            showTurnOffRemoteMicrophoneButton: true,
            showRemoveUserButton: true,

         })
    }

    
    return (
        <div className={style.page} ref={myMeeting}>
        </div>
    )
}
