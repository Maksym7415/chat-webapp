import React, { useState, useEffect } from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer/index';
import { UserConversationsListSuccess, ConversationsList } from '../../../../redux/conversations/constants/interfaces';
import { conversationUserHistoryActionRequest } from '../../../../redux/conversations/constants/actionConstants';
import { getCurrentDay } from '../../../../common/getCorrectDateFormat';
import useStyles from '../../styles/styles';

export default ({ data }: UserConversationsListSuccess) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [conversations, setConversations] = useState<Array<ConversationsList>>([]);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentConversationIdObject.currentConversationId);
  const handleChangeChat = (id: number) => dispatch(conversationUserHistoryActionRequest(id));
  console.log(lastMessage);
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
    <Grid item xs={3} >
      {conversations.map((element) => (
        <div className='flex chat__chats-item' key={element.conversationId} onClick={() => handleChangeChat(element.conversationId)} >
          <Avatar style={{ width: '70px', height: '70px' }} />
          <div className='chat__chats-item-message-conteiner relative'>
            <Typography variant='subtitle1'>{element.conversationName}</Typography>
            <div className='flex js-space-around a-items'>
              <Typography variant='caption'>{element.Messages[0] && element.Messages[0].User.id === userId ? 'Вы:' : element.conversationType === 'Dialog' ? null : `${element.Messages[0] && element.Messages[0].User.firstName}:`}</Typography>
              <Typography variant='caption' style={{
                width: '90%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }} >{element.Messages[0] && element.Messages[0].message}</Typography>
             { console.log(element.Messages[0].message)}
            </div>
            <p className={clsx(classes.dateSender, classes.dateSenderChatlist)}>{getCurrentDay(new Date(element.Messages[0] && element.Messages[0].sendDate))}</p>
          </div>
        </div>
      ))}
    </Grid>
  );
};
