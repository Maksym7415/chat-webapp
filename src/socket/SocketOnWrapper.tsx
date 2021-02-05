import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import { Messages } from '../redux/conversations/constants/interfaces';
import {
  conversationAddNewMessage, conversationEditMessage, conversationDeleteMessage, getUserConversationsActionRequest, conversationTypeStateAction,
} from '../redux/conversations/constants/actionConstants';
import { socket } from './index';
import { BackUsers } from '../components/chatsWrapper/components/chatList/interfaces';

interface MessageSocketOn {
  message: Messages
  actionType: string
  conversationId: number
}

interface Room {
  status: string
  chatId: number
}

interface TypingData {
  user: BackUsers
  conversationId: number
}

function SocketOn({ children }: any) {
  const dispatch = useDispatch();

  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);

  useEffect(() => {
    const messageCallback = ({ message, conversationId, actionType }: MessageSocketOn) => {
      console.log('new Chat create', { message, conversationId, actionType });
      if (actionType === 'new') {
        return dispatch(conversationAddNewMessage(message, conversationId));
      }
      if (actionType === 'edit') return dispatch(conversationEditMessage(message));
      if (actionType === 'delete') return dispatch(conversationDeleteMessage(message.id));
    };
    const roomConnectionResult = ({ status, chatId }: Room) => {
      if (status === 'success') {
        dispatch(getUserConversationsActionRequest());
        console.log(chatId);
        socket.emit('isRoomConnected', chatId);
      }
    };
    socket.emit('handshake', userId);
    socket.on('message', messageCallback);
    socket.on('roomConnect', roomConnectionResult);
    socket.on('typing', ({ user, conversationId }: TypingData) => dispatch(conversationTypeStateAction(conversationId, true, user)));
    return () => {
      socket.removeListener('message', messageCallback);
      socket.removeListener('roomConnect', roomConnectionResult);
    };
  }, []);

  return (
    <>
      { children }
    </>
  );
}

export default SocketOn;
