/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo } from 'react';
import { Rnd } from "react-rnd";
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { resolve } from 'dns';
import ChatsList from './components/chatList';
import UserConversationHistoryPage from './components/conversationsPages/UserConversationHistoryPage';
import { getUserConversationsActionRequest, conversationAddNewMessage, getConversationIdAction } from '../../redux/conversations/constants/actionConstants';
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
  }, []);

  useEffect(() => {
    conversationsList.forEach((chat) => {
      socket.on(`userIdChat${chat.conversationId}`, (message: Messages) => {
        dispatch(conversationAddNewMessage(message, chat.conversationId));
      });
      socket.on(`typingStateId${chat.conversationId}`, (conversation: BackUsers) => {
        timer(conversation, chat.conversationId);
      });
    });
    return () => {
      if (history.location.pathname === '/') return;
      socket.removeAllListeners();
    };
  }, [conversationsList, typing]);

  useEffect(() => {
    socket.on(`userIdNewChat${userId}`, (message: Messages, conversationId: any) => {
      dispatch(getUserConversationsActionRequest());
      dispatch(getConversationIdAction(conversationId));
    });
  }, []);

  return (
    <div className='chat__container flex'>
      <Rnd 
        style={{
          position: 'relative',
          background: '#dcf2ed'
        }}
        minWidth='20vw'
        maxWidth='60vw'
        default={{
          x: 0,
          y: 0,
          width: 200,
          height: '100%'
        }}
        disableDragging
        enableResizing={{ 
          top:false, 
          right:true, 
          bottom:false, 
          left:false, 
          topRight:false, 
          bottomRight:false, 
          bottomLeft:false, 
          topLeft:false 
        }}
      >
        <ChatsList data={conversationsList} usersTyping={usersTyping}/>
      </Rnd>
      <UserConversationHistoryPage />
        {/* <div>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </p>
      </div> */}
    </div>
  );
}
