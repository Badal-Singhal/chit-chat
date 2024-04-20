import Top from '../../components/chat-Window/Top'
import Messages from '../../components/chat-Window/Messages'
import Bottom from '../../components/chat-Window/Bottom'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useRooms } from '../../components/context/rooms.context'
import { Loader } from 'rsuite'
import { CurrentRoomProvider } from '../../components/context/CurrentRoom.context'
import { transformToArr } from '../../misc/Helper'
import { auth } from '../../misc/firebase'


export default function Chat() {

  const {chatId} =useParams();
  const rooms =useRooms();

  if(!rooms){
    return <Loader center vertical size="md" content="Loading" speed='slow'/>
  }

  const currentRoom=rooms.find(room=> room.id===chatId);
  if(!currentRoom){
    return <h6 className='text-center mt-page'>chat {chatId} not found</h6>
  }

  const {name, description}=currentRoom;

  const admins=transformToArr(currentRoom.admins);

  const isAdmin = admins.includes(auth.currentUser.uid)

  const currentRoomData ={
      name,
      description,
      admins,
      isAdmin,
  }

  

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className='chat-top'>
        <Top/>
      </div>
      <div className='chat-middle'>
        <Messages/>
      </div>
      <div className='chat-bottom'>
        <Bottom/>
      </div>
    </CurrentRoomProvider>
  )
}
