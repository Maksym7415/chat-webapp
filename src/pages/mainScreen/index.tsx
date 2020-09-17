/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rnd } from 'react-rnd';
import ChatsList from './components/chatList';
import UserConversationHistoryPage from './components/conversationsPages/UserConversationHistoryPage';
import { getUserConversationsActionRequest, conversationAddNewMessage, getConversationIdAction } from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import { Messages, Users } from '../../redux/conversations/constants/interfaces';
import socket from '../../socket';
import { Conversation, BackUsers } from './interfaces';
import './styles/index.scss';

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
  const [containerWidth, setContainerWidth] = useState<number>(300);

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
    Notification.requestPermission((permission) => {
      if (permission === 'granted') console.log('granted');
    });
  }, []);

  const notify = (message: Messages, conversationId: number) => {
    // let notification = new Notification('Новое сообщение', { body: `${message.User.firstName}: ${message.message}` });
    // notification.onclick = function (event) {
    //   dispatch(getConversationIdAction(conversationId));
    // };
  };

  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
    // dispatch(userInfoActionRequest(1));
  }, []);

  useEffect(() => {
    if (conversationsList.length) {
      conversationsList.forEach((chat) => {
        socket.on(`userIdChat${chat.conversationId}`, (message: Messages) => {
          notify(message, chat.conversationId);
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
      dispatch(getUserConversationsActionRequest());
      dispatch(getConversationIdAction(conversationId, 'Chat'));
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
        <ChatsList data={conversationsList} usersTyping={usersTyping} />
      </Rnd>
      <UserConversationHistoryPage />
    </div>
  );
}
