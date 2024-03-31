import React from 'react';
import { usePresence } from '../misc/Custom-hooks';
import { Badge, Tooltip, Whisper } from 'rsuite';

export default function PresenceDot({ uid }) {
  const presence = usePresence(uid);

  const getColor = presence => {
    if (!presence) {
      return 'gray';
    }
    switch (presence.state) {
      case 'online':
        return 'green';
      case 'offline':
        return 'red';
      default:
        return 'gray';
    }
  };
  const getText = presence => {
    if (!presence) {
      return 'unknown state';
    }
    return presence.state === 'online'
      ? 'Online'
      : `Last online ${new Date(presence.last_changed).toLocaleDateString()}`;
  };
  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(presence) }}
      />
    </Whisper>
  );
}
