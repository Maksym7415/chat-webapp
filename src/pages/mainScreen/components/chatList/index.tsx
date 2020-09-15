import React, { useState, useEffect } from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer/index';
import { UserConversationsListSuccess, ConversationsList } from '../../../../redux/conversations/constants/interfaces';
import { getConversationIdAction } from '../../../../redux/conversations/constants/actionConstants';
import { getCurrentDay } from '../../../../common/getCorrectDateFormat';
import { Conversation } from '../../index';
import useStyles from '../../styles/styles';

// type Props = UserConversationsListSuccess | Conversation;

interface Props {
  data: Array<ConversationsList>
  usersTyping: Conversation
}

export default ({ data, usersTyping }: Props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [conversations, setConversations] = useState<Array<ConversationsList>>([]);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentConversationIdObject.currentConversationId);
  const activeConversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const isCreateChat = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.createConversation.success.data);
  const handleChangeChat = (id: number) => dispatch(getConversationIdAction(id));

  useEffect(() => {
    setConversations(data);
  }, [data]);

  const getString = (element: any) => {
    const arr = Object.values(usersTyping[element.conversationId]).filter((el: any) => el.isTyping && el.userId !== userId);
    let str = '';
    arr.forEach((el: any) => str += el.firstName);
    return str;
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
    <div className='chat__chat-list-container'>
      {conversations.map((element) => (
        <div className={`flex chat__chats-item ${element.conversationId === activeConversationId ? 'chat__active' : ''}`} key={element.conversationId} onClick={() => handleChangeChat(element.conversationId)} >
          <Avatar className={classes.avatar} src={`http://localhost:8081/${element.conversationAvatar}`} />
          <div className='flex chat__chats-item-message-container relative'>
            <div className='chat__title-container'>
              <Typography className={classes.bold} variant='subtitle1'>{usersTyping[element.conversationId] && getString(element)}</Typography>
              <Typography className={classes.bold} variant='subtitle1'>{element.conversationName}</Typography>
              <Typography className={clsx(classes.dateSender, classes.dateSenderChatlist)} variant='subtitle1'>{element.Messages[0] === undefined ? '' : getCurrentDay(new Date(element.Messages[0].sendDate))}</Typography>
            </div>
              <Typography variant='caption' className={classes.messageText} >{element.Messages[0] === undefined
                ? 'Сообщений нет' : element.Messages[0]?.User?.id === userId
                  ? 'Вы:'
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
