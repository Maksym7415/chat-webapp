import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Typography, Grid, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer/index';
import { Conversation, BackUsers } from './interfaces';
import { ConversationsList } from '../../../../redux/conversations/constants/interfaces';
import { getCurrentDay } from '../../../../common/getCorrectDateFormat';
import contextMenuCallback from '../../../contextMenu/eventCallback';
import { contextMenuAction, showDialogAction } from '../../../../redux/common/commonActions';
import { getUserConversationsActionRequest } from '../../../../redux/conversations/constants/actionConstants';
import contextMenuConfig from './contextMenuConfig';
import DefaultAvatar from '../../../../components/defaultAvatar';
import useStyles from './styles/styles';

interface ParamsId {
  id: string
}

let isEmit = false;
let newTimer: any = {};

function ChatsList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentConversationId = +useParams<ParamsId>().id;
  const history = useHistory();

  const [conversations, setConversations] = useState<Array<ConversationsList>>([]);
  const data = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationsList.success.data);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const createConversationInfo = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentConversationIdObject);
  const typingObject = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const [usersTyping, setUsersTyping] = useState<Conversation>({
    0: {
      0: {
        firstName: '',
        isTyping: false,
        userId: 0,
        conversationId: 0,
      },
    },
  });

  const getString = (element: any) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter((el: any) => el.isTyping && el.userId !== userId);
    let str = '';
    arr.forEach((el: any) => str += el.firstName);
    return str;
  };

  // const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  // const [usersTyping, setUsersTyping] = useState<Conversation>({
  //   0: {
  //     0: {
  //       firtsName: '',
  //       isTyping: false,
  //       userId: 0,
  //       conversationId: 0,
  //     },
  //   },
  // });

  // const []

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

  const handleClickChatItem = (element: ConversationsList, event: React.MouseEvent<HTMLElement>, id: number) => {
    contextMenuCallback(event, id, [], dispatch);
    history.push(`/chat/${id}`);
    // handleChangeChat(element.conversationId, element.conversationType);
  };

  const closeContextMenuAction = () => dispatch(contextMenuAction({
    yPos: '',
    xPos: '',
    isShowMenu: false,
    messageId: 0,
    config: [],
  }));

  const handleCloseContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (event.type === 'contextmenu') {
      event.preventDefault();
      console.log('prevent');
    }
    if (event.type === 'click') {
      closeContextMenuAction();
    }
  };

  const handleDeleteChat = () => {
    console.log('delete chat');
    closeContextMenuAction();
  };

  const handleViewProfile = () => {
    dispatch(showDialogAction('profile'));
    closeContextMenuAction();
  };

  useEffect(() => {
    console.log('CHAT LIST');
    dispatch(getUserConversationsActionRequest());
  }, []);

  useEffect(() => {
    const { user, conversationId } = typingObject;
    timer(user, conversationId);
  }, [typingObject]);

  useEffect(() => {
    setConversations(data);
  }, [data]);

  useEffect(() => {
    console.log(history);
    setConversations((prevState): Array<ConversationsList> => {
      let conversations: Array<ConversationsList> = [...prevState];
      prevState.forEach((el: ConversationsList, index: number) => {
        console.log(el, currentConversationId);
        if (el.conversationId === currentConversationId) {
          conversations[index].Messages[0] = lastMessage[currentConversationId];
        } else {
          conversations.push({
            ...createConversationInfo.conversationInfo,
            Messages: [lastMessage[createConversationInfo.currentConversationId]],
          });
        }
      });
      return conversations;
    });
  }, [lastMessage]);

  return (
      <div
        onClick={handleCloseContextMenu}
        onContextMenu={handleCloseContextMenu}
        className='chat__chat-list-container'
      >
        {conversations.map((element) => (
          <div
            onContextMenu={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, element.conversationId, contextMenuConfig(handleDeleteChat, handleViewProfile), dispatch)}
            onClick={(event: React.MouseEvent<HTMLElement>) => handleClickChatItem(element, event, element.conversationId)}
            className={`flex chat__chats-item ${element.conversationId === currentConversationId ? 'chat__active' : ''}`}
            key={element.conversationId}
          >
            {element.conversationAvatar ? <Avatar className={classes.avatar} src={`${process.env.REACT_APP_BASE_URL}/${element.conversationAvatar}`} /> : <DefaultAvatar name={element.conversationName} width='50px' height='50px' fontSize='1.1rem' />}
            <div className='flex chat__chats-item-message-container relative'>
              <div className='chat__title-container'>
                <Typography className={classes.bold} variant='subtitle1'>{usersTyping[element.conversationId] && getString(element)}</Typography>
                <Typography className={classes.bold} variant='subtitle1'>{element.conversationName}</Typography>
                <Typography className={clsx(classes.dateSender, classes.dateSenderChatlist)} variant='subtitle1'>{element.Messages[0] === undefined ? '' : getCurrentDay(new Date(element.Messages[0].sendDate), false)}</Typography>
              </div>
              {console.log(element)}
                <Typography variant='caption' className={classes.messageText} >{element.Messages[0] === undefined
                  ? 'Сообщений нет' : element.Messages[0]?.User?.id === userId
                    ? `Вы: ${element.Messages[0].message}`
                    : `${element.Messages[0]?.User?.firstName}: ${element.Messages[0].message}`}
                </Typography>
            </div>
          </div>
        ))}
      </div>
  );
}

export default ChatsList;
