/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import ChatsList from './components/chatList';
import UserConversationHistoryPage from './components/conversationsPages/UserConversationHistoryPage';
import { getUserConversationsActionRequest, conversationAddNewMessage, getConversationIdAction } from '../../redux/conversations/constants/actionConstants';
import { Messages } from '../../redux/conversations/constants/interfaces';
import socket from '../../socket';
import { Conversation, BackUsers } from './interfaces';
import './styles/index.scss';
import { Paths } from '../../routing/config/paths';

// hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

let isEmit = false;
let newTimer: any = {};

export default function BasicTextFields({ history }: RouteComponentProps) {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const conversationsList = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationsList.success.data);
  const { userId } = useAppSelector(({ authReducer }) => authReducer.tokenPayload);
  const typing = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationTypeState);

  // STATES
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

  // FUNCTIONS
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

  // USEEFFECTS
  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
    // dispatch(userInfoActionRequest(1));
  }, []);

  useEffect(() => {
    if (conversationsList.length) {
      conversationsList.forEach((chat) => {
        socket.on(`userIdChat${chat.conversationId}`, (message: Messages) => {
          dispatch(conversationAddNewMessage(message, chat.conversationId));
        });
        socket.on(`typingStateId${chat.conversationId}`, (conversation: BackUsers) => {
          timer(conversation, chat.conversationId);
        });
      });
    }
  }, [conversationsList, typing]);

  useEffect(() => {
    socket.on(`userIdNewChat${userId}`, (message: Messages, conversationId: number) => {
      // dispatch(getUserConversationsActionRequest());
      dispatch(getConversationIdAction(conversationId, 'Chat'));
      history.push(`${Paths.chat}/${conversationId}`);
      // dispatch(conversationAddNewMessage(message, conversationId));
    });
  }, [conversationsList]);

  useEffect(() => () => {
    // if (history.location.pathname === '/') return;
    socket.removeAllListeners();
  }, [conversationsList]);

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
