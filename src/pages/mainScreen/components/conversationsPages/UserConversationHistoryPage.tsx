import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper, TextField, InputAdornment, IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { conversationUserHistoryActionRequest } from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import getCorrectDate from '../../../../common/getCorrectDateFormat';
import socket from '../../../../socket';
import useStyles from '../../styles/styles';

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const [message, setMessage] = useState<string>('');

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setMessage(event.target.value);
  };

  const handleSendMessage = () => socket.emit('chats', ({ conversationId, message }));

  useEffect(() => {
    dispatch(conversationUserHistoryActionRequest(1));
  }, [dispatch]);

  return (
    <Grid container item xs={6}>
      <Grid item xs={12}>
        {
          messageHistory.map(({ fkSenderId, message, sendDate }, index) => (
            <div className={classes.messagesDiv} key={index}>
              <Paper elevation={1} className={clsx(classes.paperSenderMessage, {
                [classes.paperFriendMessage]: fkSenderId !== 1,
              })}>
                <p className={classes.messageText}>{message}</p>
                <p className={classes.dateSender}>{getCorrectDate(new Date(sendDate))}</p>
              </Paper>
            </div>
          ))
        }
      </Grid>
      <Grid item xs={12}>
        <div className='chat__send-message-input'>
          <TextField
            fullWidth
            // variant='outlined'
            // size='small'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // aria-label="toggle password visibility"
                    onClick={handleSendMessage}
                  >
                    <SendIcon/>
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
