import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper, TextField, InputAdornment, IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { conversationUserHistoryActionRequest } from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import { Messages } from '../../../../redux/conversations/constants/interfaces';
import { getCurrentDay, fullDate } from '../../../../common/getCorrectDateFormat';
import socket from '../../../../socket';
import useStyles from '../../styles/styles';
import AddFiles from './addFilesComponent';

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<Array<Messages>>([]);
  const [message, setMessage] = useState<string>('');

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    socket.emit('chats', ({
      conversationId,
      message: {
        message, fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
      },
      userId,
    }), (success: boolean) => {
      if (success) setMessage('');
    });
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      socket.emit('chats', ({
        conversationId,
        message: {
          message, fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
        },
        userId,
      }), (success: boolean) => {
        if (success) setMessage('');
      });
    }
  };

  useEffect(() => {
    dispatch(conversationUserHistoryActionRequest(1));
  }, [dispatch]);

  useEffect(() => {
    setAllMessages(messageHistory);
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && conversationId in lastMessage) setAllMessages((prev) => ([...prev, lastMessage[conversationId]]));
  }, [lastMessage]);

  return (
    <Grid className='overflowY-auto' style={{ maxHeight: '87vh' }} container item xs={8}>
      <Grid item xs={12}>
        {
          allMessages.map(({
            fkSenderId, message, sendDate, User,
          }, index) => (
            <div className={classes.messagesDiv} key={index}>
              <Paper elevation={1} className={clsx(classes.paperSenderMessage, {
                [classes.paperFriendMessage]: fkSenderId !== userId,
              })}>
                <p className={classes.messageText}>{message}</p>
                <p className={classes.messageText}>{User.tagName}</p>
                <p className={classes.dateSender}>{getCurrentDay(new Date(sendDate))}</p>
              </Paper>
            </div>
          ))
        }
      </Grid>
      <Grid item xs={12}>
        <div className='chat__send-message-input'>
          <TextField
            fullWidth
            onKeyDown={sendMessageByKey}
            InputProps={{
              endAdornment: (
                message === '' ? <AddFiles /> : <InputAdornment position="end">
                  <IconButton
                    // aria-label="toggle password visibility"
                    onClick={handleSendMessage}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Type message'
            value={message}
            onChange={handleChangeMessage}
          />
        </div>
      </Grid>
    </Grid>

  );
}
