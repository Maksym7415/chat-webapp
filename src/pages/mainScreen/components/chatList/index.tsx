import React, { useState, useEffect } from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer/index';
import { ChatListProps } from '../../interfaces';
import { ConversationsList } from '../../../../redux/conversations/constants/interfaces';
import { getConversationIdAction } from '../../../../redux/conversations/constants/actionConstants';
import { getCurrentDay } from '../../../../common/getCorrectDateFormat';
import contextMenuCallback from '../../../../components/contextMenu/eventCallback';
import { contextMenuAction, showDialogAction } from '../../../../redux/common/commonActions';
import contextMenuConfig from './contextMenuConfig';
import DefaultAvatar from '../../../../components/defaultAvatar';

import useStyles from '../../styles/styles';

export default ({ data, usersTyping }: ChatListProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [conversations, setConversations] = useState<Array<ConversationsList>>([]);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentConversationIdObject.currentConversationId);
  const activeConversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const isCreateChat = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.createConversation.success.data);

  const handleChangeChat = (id: number, type: string) => dispatch(getConversationIdAction(id, type));

  useEffect(() => {
    setConversations(data);
  }, [data]);

  const getString = (element: any) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter((el: any) => el.isTyping && el.userId !== userId);
    let str = '';
    arr.forEach((el: any) => str += el.firstName);
    return str;
  };

  const handleClickChatItem = (element: ConversationsList, event: React.MouseEvent<HTMLElement>, id: number) => {
    contextMenuCallback(event, id, [], dispatch);
    handleChangeChat(element.conversationId, element.conversationType);
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
          onContextMenu={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, element.conversationId, contextMenuConfig(handleDeleteChat, handleViewProfile), dispatch)}
          onClick={(event: React.MouseEvent<HTMLElement>) => handleClickChatItem(element, event, element.conversationId)}
          className={`flex chat__chats-item ${element.conversationId === activeConversationId ? 'chat__active' : ''}`}
          key={element.conversationId}
        >
          {console.log(element.conversationAvatar)}
          {element.conversationAvatar ? <Avatar className={classes.avatar} src={`http://localhost:8081/${element.conversationAvatar}`} /> : <DefaultAvatar name={element.conversationName} width='50px' height='50px' fontSize='1.1rem' />}
          <div className='flex chat__chats-item-message-container relative'>
            <div className='chat__title-container'>
              <Typography className={classes.bold} variant='subtitle1'>{usersTyping[element.conversationId] && getString(element)}</Typography>
              <Typography className={classes.bold} variant='subtitle1'>{element.conversationName}</Typography>
              <Typography className={clsx(classes.dateSender, classes.dateSenderChatlist)} variant='subtitle1'>{element.Messages[0] === undefined ? '' : getCurrentDay(new Date(element.Messages[0].sendDate), false)}</Typography>
            </div>
              <Typography variant='caption' className={classes.messageText} >{element.Messages[0] === undefined
                ? 'Сообщений нет' : element.Messages[0]?.User?.id === userId
                  ? `Вы: ${element.Messages[0].message}`
                  : element.conversationType === 'Dialog'
                    ? null
                    : `${element.Messages[0]?.User?.firstName}: ${element.Messages[0].message}`}
              </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};
