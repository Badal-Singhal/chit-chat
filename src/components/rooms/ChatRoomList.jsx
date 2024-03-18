import { Loader, Nav } from 'rsuite';
import RoomItem from './RoomItem';
import { useRooms } from '../context/rooms.context';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom';

export default function ChatRoomList({ aboveElementHeight }) {
  const rooms = useRooms();
  const location =useLocation();
  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElementHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            key={room.id}
            componentClass={Link}
            to={`/chat/${room.id}`}
            eventKey={`/chat/${room.id}`}
          >
            <RoomItem
              name={room.name}
              createdAt={room.createdAt}
              description={room.description}
            />
          </Nav.Item>
        ))}
    </Nav>
  );
}
