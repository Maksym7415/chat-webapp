/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo, useRef } from 'react';
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
let newTimer: any = {};

export default function BasicTextFields({ history }: RouteComponentProps) {
  const dispatch = useDispatch();
  // const dragChatList = useRef<HTMLDivElement|null>(null);
  // const dragChatHistory = useRef(null);
  const dragContainer = useRef<HTMLDivElement>(null);
  const dragLine = useRef(null);
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

  //DRAG STATES

  const [isResizing, setIsResizing] = useState<Boolean>(false);
  const [chatListWidth, setChatListWidth] = useState<number>(0);
  const [chatHistoryWidth, setChatHistoryWidth] = useState<number>(0);

  //

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
    // dispatch(userInfoActionRequest(1));
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
  }, [conversationsList, typing]);

  const onDragUp = () => {
    setIsResizing(false);
  }

  const onDragDown = (event: React.MouseEvent) => {
    setIsResizing(true);
  }

  const onDragMove = (event: React.MouseEvent) => {
    if(!isResizing) {
      return;
    }
    else {
      if(dragContainer.current) {
        let rightWidth = dragContainer.current.clientWidth - (event.clientX - dragContainer.current.offsetLeft + 8);
        let leftWidth = event.clientX - dragContainer.current.offsetLeft + 8;
        setChatHistoryWidth(rightWidth);
        setChatListWidth(leftWidth);
      }
    }
  }

  return (
    <Grid 
      className='chat__container relative' 
      container 
      item 
      xs={12} 
      justify="space-between" 
      onMouseMove={(event) => onDragMove(event)} 
      onMouseUp={onDragUp} 
      ref={dragContainer}
    >
      <ChatsList 
        data={conversationsList} 
        usersTyping={usersTyping} 
        // dragChatListRef={dragChatList}
        dragLineRef={dragLine}
        onDragDown={onDragDown}
        width={chatListWidth}
      />
      <UserConversationHistoryPage 
        // dragRef={dragChatHistory}
        width={chatHistoryWidth}
      />
    </Grid>
  );
}
