/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { RouteComponentProps } from 'react-router';
import ChatsWrapper from '../../components/chatsWrapper';
import './styles/index.scss';

function MainScreen({ history }: RouteComponentProps) {
  return (
    <ChatsWrapper/>
  );
}

export default MainScreen;
