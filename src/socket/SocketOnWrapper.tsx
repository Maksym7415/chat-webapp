import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import { Messages } from '../redux/conversations/constants/interfaces';
import {
  conversationAddNewMessage, conversationEditMessage, conversationDeleteMessage,
} from '../redux/conversations/constants/actionConstants';
import { socket } from './index';

interface MessageSocketOn {
  message: Messages
  actionType: string
  conversationId: number
}

function SocketOn({ children }: any) {
  const dispatch = useDispatch();

  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);

  useEffect(() => {
    const messageCallback = ({ message, conversationId, actionType }: MessageSocketOn) => {
      if (actionType === 'new') {
        return dispatch(conversationAddNewMessage(message, conversationId));
      }
      if (actionType === 'edit') return dispatch(conversationEditMessage(message));
      if (actionType === 'delete') return dispatch(conversationDeleteMessage(message.id));
    };
    socket.emit('handshake', userId);
    socket.on('message', messageCallback);
    return () => {
      socket.removeListener('message', messageCallback);
    };
  }, []);

  return (
    <>
      { children }
    </>
  );
}

export default SocketOn;
