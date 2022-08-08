/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { History } from 'history';
import { ChatListProps } from '../../interfaces';
import { ConversationsList } from '../../../../redux/conversations/constants/interfaces';
import { getCurrentDay } from '../../../../common/getCorrectDateFormat';
import contextMenuCallback from '../../../../components/contextMenu/eventCallback';
import { contextMenuAction, showDialogAction } from '../../../../redux/common/commonActions';
import contextMenuConfig from './contextMenuConfig';
import DefaultAvatar from '../../../../components/defaultAvatar';
import { Paths } from '../../../../routing/config/paths';
import useStyles from '../../styles/styles';
import languages from '../../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

interface ParamsId {
  id: string
}

export default ({ data, usersTyping, history }: ChatListProps<History>) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const params = useParams<any>();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const { userId } = useAppSelector(({ authReducer }) => authReducer.tokenPayload);
  const lastMessage = useAppSelector(({ userConversationReducer }) => userConversationReducer.lastMessages);
  const conversationId = useAppSelector(({ userConversationReducer }) => userConversationReducer.currentConversationIdObject.currentConversationId);

  // STATES
  const [conversations, setConversations] = useState<Array<ConversationsList>>([]);

  // FUNCTIONS
  const getString = (element: any) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter((el: any) => el.isTyping && el.userId !== userId);
    let str = '';
    arr.forEach((el: any) => str += el.firstName);
    return str;
  };

  const handleClickChatItem = (element: ConversationsList, event: React.MouseEvent<HTMLElement>, id: number) => {
    contextMenuCallback(event, id, [], dispatch);
    history.push(`${Paths.chat}/${id}`);
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
    }
    if (event.type === 'click') {
      closeContextMenuAction();
    }
  };

  const handleDeleteChat = () => {
    closeContextMenuAction();
  };

  const handleViewProfile = () => {
    dispatch(showDialogAction('profile'));
    closeContextMenuAction();
  };

  const handleClearHistory = () => {};

  // USEEFECTS
  useEffect(() => {
    setConversations(data);
  }, [data]);

  useEffect(() => {
    setConversations((prevState): Array<ConversationsList> => {
      let conversations: Array<ConversationsList> = [...prevState];
      prevState.forEach((el: ConversationsList, index: number) => {
        if (el.conversationId === conversationId) {
          conversations[index].Messages[0] = lastMessage[conversationId];
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
          onContextMenu={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, element.conversationId, contextMenuConfig(lang, handleDeleteChat, handleViewProfile, handleClearHistory), dispatch)}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClickChatItem(element, event, element.conversationId)}
          className={`flex chat__chats-item ${element.conversationId === +params.id ? 'chat__active' : ''}`}
          key={element.conversationId}
        >
          {element.conversationAvatar ? <Avatar className={classes.avatar} src={`${process.env.REACT_APP_BASE_URL}/${element.conversationAvatar}`} /> : <DefaultAvatar name={element.conversationName} width='50px' height='50px' fontSize='1.1rem' />}
          <div className='flex chat__chats-item-message-container relative'>
            <div className='chat__title-container'>
              <Typography className={classes.bold} variant='subtitle1'>{usersTyping[element.conversationId] && getString(element)}</Typography>
              <Typography className={classes.bold} variant='subtitle1'>{element.conversationName}</Typography>
              <Typography className={clsx(classes.dateSender, classes.dateSenderChatlist)} variant='subtitle1'>{element.Messages[0] === undefined ? '' : getCurrentDay(new Date(element.Messages[0].sendDate), false)}</Typography>
            </div>
              <Typography variant='caption' className={classes.messageText} >{element.Messages[0] === undefined
                ? languages[lang].generals.noMessages : element.Messages[0]?.User?.id === userId
                  ? `${languages[lang].generals.you}: ${element.Messages[0].message}`
                  : element.conversationType !== 'Dialog'
                    ? null
                    : `${element.Messages[0]?.User?.firstName}: ${element.Messages[0].message}`}
              </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
