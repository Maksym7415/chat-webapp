/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { resolve } from 'dns';
import ChatsList from './components/chatList';
import UserConversationHistoryPage from './components/conversationsPages/UserConversationHistoryPage';
import { getUserConversationsActionRequest, conversationAddNewMessage, conversationTypeStateAction } from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import { Messages, Users } from '../../redux/conversations/constants/interfaces';
import socket from '../../socket';
import { userInfoActionRequest } from '../../redux/user/actions/actions';
import './styles/index.scss';

interface Timer {
  [key: number]: any
}

export interface Conversation {
  [key: number]: User
}

interface User {
  [key: number]: BackUsers
}

interface BackUsers {
  // id: number
  firtsName: string
  isTyping: boolean
  userId: number
  conversationId: number
}

let isEmit = false;
let newTimer: any = null;

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
  // const [timer, setTimer] = useState<Timer>({ });

  const timer = (user: BackUsers) => new Promise((resolve) => {
    let timer: any;
    setUsersTyping((prev: any) => {
      const conversation = prev[user.conversationId];
      return { ...prev, [user.conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: true } } };
    });
    timer = setTimeout(() => resolve(timer), 3000);
  }).then((timer: any) => {
    // setUsersTyping((prev: any) => {
    //   const conversation = prev[user.conversationId];
    //   return { ...prev, [user.conversationId]: { ...conversation, [user.userId]: { ...user, isTyping: false } } };
    // });
    clearTimeout(timer);
  });

  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
    // dispatch(userInfoActionRequest(1));
  }, []);

  useEffect(() => {
    conversationsList.forEach((chat) => {
      socket.on(`userIdChat${chat.conversationId}`, (message: Messages) => {
        dispatch(conversationAddNewMessage(message, chat.conversationId));
      });
      socket.on(`typingStateId${chat.conversationId}`, (conversation: BackUsers) => {
        timer(conversation);
        // { ...value, [senderId]: setTimeout(() => dispatch(conversationTypeStateAction(chat.conversationId, false, newUsers, userId)), 3000) };
        // dispatch(conversationTypeStateAction(chat.conversationId, isTyping, users, userId));
      });
    });
  }, [conversationsList, typing]);

  return (
    <Grid className='chat__container relative' container item xs={12} justify="space-between">
      {console.log(usersTyping)}
      <ChatsList data={conversationsList} usersTyping={usersTyping}/>
      <UserConversationHistoryPage />
    </Grid>
  );
}
