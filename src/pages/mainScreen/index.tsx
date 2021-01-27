/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rnd } from 'react-rnd';
import ChatsWrapper from '../../components/chatsWrapper';
import UserConversationHistoryPage from '../conversationsPages/UserConversationHistoryPage';
import {
  conversationAddNewMessage, conversationEditMessage, conversationDeleteMessage,
} from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import { MessageSocketOn } from './interfaces';
import socket from '../../socket';

import './styles/index.scss';

let isEmit = false;
let newTimer: any = {};

export default function BasicTextFields({ history }: RouteComponentProps) {
  const dispatch = useDispatch();

  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  // const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  // const [usersTyping, setUsersTyping] = useState<Conversation>({
  //   0: {
  //     0: {
  //       firtsName: '',
  //       isTyping: false,
  //       userId: 0,
  //       conversationId: 0,
  //     },
  //   },
  // });

  // const []

  // const [timer, setTimer] = useState<Timer>({ });
  // const currentUserTyping = (user: BackUsers, conversationId: number) => {
  //   if (!isEmit) {
  //     isEmit = true;
  //     setUsersTyping((prev: any) => {
  //       const conversation = prev[conversationId];
  //       return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: true } } };
  //     });
  //     newTimer[conversationId] = { ...newTimer[conversationId] };
  //     newTimer[conversationId][user.userId] = setTimeout(() => setUsersTyping((prev: any) => {
  //       const conversation = prev[conversationId];
  //       isEmit = false;
  //       return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: false } } };
  //     }), 3000);
  //   } else {
  //     clearTimeout(newTimer[conversationId][user.userId]);
  //     setUsersTyping((prev: any) => {
  //       const conversation = prev[conversationId];
  //       return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: true } } };
  //     });
  //     newTimer[conversationId] = { ...newTimer[conversationId] };
  //     newTimer[conversationId][user.userId] = setTimeout(() => setUsersTyping((prev: any) => {
  //       const conversation = prev[conversationId];
  //       isEmit = false;
  //       return { ...prev, [conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: false } } };
  //     }), 3000);
  //   }
  // };

  // const timer = (user: BackUsers, conversationId: number) => {
  //   if (conversationId in newTimer) {
  //     currentUserTyping(user, conversationId);
  //   } else {
  //     isEmit = false;
  //     currentUserTyping(user, conversationId);
  //   }
  // };

  useEffect(() => {
    socket.emit('handshake', userId);
    socket.on('message', ({ message, conversationId, actionType }: MessageSocketOn) => {
      console.log('SOCKET MESSAGE', { message, conversationId, actionType });
      if (actionType === 'new') {
        return dispatch(conversationAddNewMessage(message, conversationId));
      }
      if (actionType === 'edit') return dispatch(conversationEditMessage(message));
      if (actionType === 'delete') return dispatch(conversationDeleteMessage(message.id));
    });
    return () => console.log('return');
  }, []);

  return (
    <ChatsWrapper/>
  );
}
