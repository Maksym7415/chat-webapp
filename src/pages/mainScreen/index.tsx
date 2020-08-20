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

interface BackUsers {
  id: number
  firtsName: string
  isTyping: boolean
  firstName: string
  userId: number
}

let isEmit = false;
let newTimer: any = null;

const getSender = (senderId: number, setTimer: any, dispatch: any, conversationTypeStateAction: any, conversationId: any, userId: any) => new Promise((resolve) => {
  let prev = {};
  resolve(
    { ...prev, [senderId]: setTimeout(() => dispatch(conversationTypeStateAction(conversationId, false, [], userId)), 3000) },
  );
});

export default function BasicTextFields({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  const conversationsList = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationsList.success.data);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const [timer, setTimer] = useState<Timer>({ });

  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
    // dispatch(userInfoActionRequest(1));
  }, []);

  useEffect(() => {
    conversationsList.forEach((chat) => {
      socket.on(`userIdChat${chat.conversationId}`, (message: Messages) => {
        dispatch(conversationAddNewMessage(message, chat.conversationId));
      });
      socket.on(`typingStateId${chat.conversationId}`, (isTyping: boolean, users: Array<BackUsers>, senderId: number) => {
        setTimer(async (value) => {
          if (!value[senderId]) {
            clearTimeout(newTimer);
            newTimer = await getSender(senderId, setTimer, dispatch, conversationTypeStateAction, chat.conversationId, userId);

            return { ...value, [senderId]: newTimer };
          }

          clearTimeout(value[senderId]);
          const newUsers: Array<Users> = users.filter((el) => el.userId !== senderId);
          return { ...value, [senderId]: setTimeout(() => dispatch(conversationTypeStateAction(chat.conversationId, false, newUsers, userId)), 3000) };
        });

        dispatch(conversationTypeStateAction(chat.conversationId, isTyping, users, userId));
      });
    });
  }, [conversationsList, typing]);

  return (
    <Grid className='chat__container relative' container item xs={12} justify="space-between">
      <ChatsList data={conversationsList} />
      <UserConversationHistoryPage />
    </Grid>
  );
}
