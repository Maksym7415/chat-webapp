import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import ChatsList from './components/chatList';
import UserConversationHistoryPage from './components/conversationsPages/UserConversationHistoryPage';
import ConversationProfile from './components/conversationsPages/ConversationProfile';
import { getUserConversationsActionRequest, conversationAddNewMessage } from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import { Messages } from '../../redux/conversations/constants/interfaces';
import socket from '../../socket';
import './styles/index.scss';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    // display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface IProps {
  history: {
    push: (url: string) => void
  }
}

export default function BasicTextFields({ history: { push } }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversationsList = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationsList.success.data);

  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
  }, []);

  useEffect(() => {
    conversationsList.forEach((chat) => {
      socket.on(`userIdChat${chat.conversationId}`, (message: Messages) => dispatch(conversationAddNewMessage(message, chat.conversationId)));
    });
  }, [conversationsList]);

  return (
    <Grid container item xs={12} justify="space-between">
      <ChatsList data={conversationsList} />
      <UserConversationHistoryPage />
      <ConversationProfile />
    </Grid>
  );
}
