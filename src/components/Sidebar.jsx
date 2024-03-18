import React, { useEffect, useRef, useState } from 'react';
import DashboardToggle from './Dashboard/DashboardToggle';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import { Divider } from 'rsuite';
import ChatRoomList from './rooms/ChatRoomList';

export default function Sidebar() {

  const topSideBarRef=useRef();
  const [height, setHeight]=useState(0);

  useEffect(()=>{
      if(topSideBarRef.current){
        setHeight(topSideBarRef.current.scrollHeight)
      }
  },[topSideBarRef])
  
  return (
    <div className="h-100 pt-2">
      <div ref={topSideBarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Converstaions</Divider>
      </div>
      <ChatRoomList aboveElementHeight={height} />
    </div>
  );
}
