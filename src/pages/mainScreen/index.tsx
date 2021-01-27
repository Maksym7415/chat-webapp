/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ChatsWrapper from '../../components/chatsWrapper';
import {
  conversationAddNewMessage, conversationEditMessage, conversationDeleteMessage,
} from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import { MessageSocketOn } from './interfaces';
import { socket } from '../../socket';

import './styles/index.scss';

function MainScreen({ history }: RouteComponentProps) {
  // const dispatch = useDispatch();

  // const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);

  // useEffect(() => {
  //   socket.emit('handshake', userId);
  //   socket.on('message', ({ message, conversationId, actionType }: MessageSocketOn) => {
  //     console.log('SOCKET MESSAGE', { message, conversationId, actionType });
  //     if (actionType === 'new') {
  //       console.log(message, conversationId);
  //       return dispatch(conversationAddNewMessage(message, conversationId));
  //     }
  //     if (actionType === 'edit') return dispatch(conversationEditMessage(message));
  //     if (actionType === 'delete') return dispatch(conversationDeleteMessage(message.id));
  //   });
  //   return () => console.log('return');
  // }, []);

  return (
    <ChatsWrapper/>
  );
}

export default MainScreen;
