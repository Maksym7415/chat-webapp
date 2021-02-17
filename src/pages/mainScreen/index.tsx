/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ChatsWrapper from '../../components/chatsWrapper';
import ChatList from '../../components/chatsWrapper/components/chatList';
import './styles/index.scss';

function MainScreen({ history }: RouteComponentProps) {
  if (window.innerWidth > 800) return <ChatsWrapper isMain={true} />;
  return <ChatList />;
}

export default MainScreen;
