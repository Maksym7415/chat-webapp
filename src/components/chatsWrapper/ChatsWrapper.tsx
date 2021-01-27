import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import ChatsList from './components/chatList';

export function ChatsWrapper({ children }: any) {
  const [containerWidth, setContainerWidth] = useState<number>(300);
  return (
    <div className='full-w flex'>
      <Rnd
        style={{
          position: 'relative',
          background: '#dcf2ed',
        }}
        minWidth= {80}
        maxWidth='60vw'
        default={{
          x: 0,
          y: 0,
          width: containerWidth,
          height: '100%',
        }}
        onResize={(e, direction, ref, delta, position) => {
          ref.offsetWidth < 200 && setContainerWidth(80);
        }}
        disableDragging
        enableResizing={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <ChatsList />
      </Rnd>
      { children }
    </div>
  );
}

export default ChatsWrapper;
