/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rnd } from 'react-rnd';
import ChatsList from './components/chatList';
import UserConversationHistoryPage from './components/conversationsPages/UserConversationHistoryPage';
import {
  getUserConversationsActionRequest, conversationAddNewMessage, getConversationIdAction, conversationEditMessage, conversationDeleteMessage,
} from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import { MessageSocketOn, Conversation, BackUsers } from './interfaces';
import socket from '../../socket';

import './styles/index.scss';

let isEmit = false;
let newTimer: any = {};

export default function BasicTextFields({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const conversationsList = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationsList.success.data);

  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const [usersTyping, setUsersTyping] = useState<Conversation>({
    0: {
      0: {
        firtsName: '',
        isTyping: false,
        userId: 0,
        conversationId: 0,
      },
    },
  });
  const [containerWidth, setContainerWidth] = useState<number>(300);
  // const []

  // const [timer, setTimer] = useState<Timer>({ });
  const currentUserTyping = (user: BackUsers, conversationId: number) => {
    if (!isEmit) {
      isEmit = true;
      setUsersTyping((prev: any) => {
        const conversation = prev[conversationId];
        return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: true } } };
      });
      newTimer[conversationId] = { ...newTimer[conversationId] };
      newTimer[conversationId][user.userId] = setTimeout(() => setUsersTyping((prev: any) => {
        const conversation = prev[conversationId];
        isEmit = false;
        return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: false } } };
      }), 3000);
    } else {
      clearTimeout(newTimer[conversationId][user.userId]);
      setUsersTyping((prev: any) => {
        const conversation = prev[conversationId];
        return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: true } } };
      });
      newTimer[conversationId] = { ...newTimer[conversationId] };
      newTimer[conversationId][user.userId] = setTimeout(() => setUsersTyping((prev: any) => {
        const conversation = prev[conversationId];
        isEmit = false;
        return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: false } } };
      }), 3000);
    }
  };

  const timer = (user: BackUsers, conversationId: number) => {
    if (conversationId in newTimer) {
      currentUserTyping(user, conversationId);
    } else {
      isEmit = false;
      currentUserTyping(user, conversationId);
    }
  };

  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
    socket.emit('handshake', userId);
    socket.on('message', ({ message, conversationId, actionType }: MessageSocketOn) => {
      console.log('SOCKET MESSAGE', { message, conversationId, actionType });
      if (actionType === 'new') {
        dispatch(conversationAddNewMessage(message, conversationId));
      }
      if (actionType === 'edit') dispatch(conversationEditMessage(message));
      if (actionType === 'delete') dispatch(conversationDeleteMessage(message.id));
    });
  }, []);

  return (
    <div className='chat__container flex'>
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
        <ChatsList data={conversationsList} usersTyping={usersTyping} history={history} />
      </Rnd>
      <UserConversationHistoryPage history={history}/>
    </div>
  );
}
