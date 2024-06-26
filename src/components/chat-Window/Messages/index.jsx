import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/Helper';
import MessageItem from './MessageItem';

export default function Messages() {

  const [messages,setMessages]=useState(null);
  const {chatId} =useParams();

  const isChatEmpty=messages && messages.length===0;
  const canShowMessages=messages && messages.length>0;

  useEffect(()=>{
    const messagesRef=database.ref('/messages');
    messagesRef.orderByChild('roomId').equalTo(chatId).on('value',snap=>{
      const data =transformToArrWithId(snap.val());
      setMessages(data);
    })
    return ()=>{
      messagesRef.off('value');
    }
  },[chatId])
  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>no message available..</li>}
      {canShowMessages && messages.map(msg=><MessageItem key={msg.id} message={msg}/>)}
    </ul>
  )
}
