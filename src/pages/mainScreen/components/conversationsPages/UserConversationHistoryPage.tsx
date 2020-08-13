import React, { useEffect, useState, useMemo } from 'react';
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

interface CurrentConversationMessages {
  [key: number]: Array<Messages>
}

const scrollTop = (ref: any, mainGrid: any, offset: number) => {
  if (ref.current) {
    if (mainGrid.scrollTop === 0 && offset !== 0) {
      return mainGrid.scrollTo({
        top: 10,
        behavior: 'smooth',
      });
    }
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [message, setMessage] = useState<string>('');

  const ref = React.useRef(null);
  useMemo(() => setAllMessages((prev) => ({ ...prev, [conversationId]: [] })), [conversationId]);
  // useMemo(() => scrollTop(ref), [conversationId]);

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

  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (element.scrollTop === 0 && messageHistory.length === 15) {
      dispatch(conversationUserHistoryActionRequest(conversationId, pagination.currentPage + 15));
    }
  };
  // useEffect(() => {
  //   // dispatch(conversationUserHistoryActionRequest(1));
  //   scrollTop(ref);
  // }, [dispatch, conversationId]);

  useEffect(() => {
    setAllMessages((prev) => ({ ...prev, [conversationId]: [...messageHistory, ...prev[conversationId]] }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && conversationId in lastMessage) setAllMessages((prev) => ({ ...prev, [conversationId]: [...prev[conversationId], lastMessage[conversationId]] }));
  }, [lastMessage]);

  useEffect(() => {
    let element = document.getElementById('messages');
    if (element) {
      scrollTop(ref, element, pagination.currentPage);
    }
  }, [allMessages]);

  return (
    <Grid className='overflowY-auto' id='messages' style={{ maxHeight: '87vh' }} container item xs={8} onScroll={scrollHandler}>
      <Grid item xs={12}>
        {
          allMessages[conversationId] && allMessages[conversationId].map(({
            fkSenderId, message, sendDate, User,
          }, index) => (
              <div className={classes.messagesDiv} key={index} ref={ref}>
                <Paper elevation={1} className={clsx(classes.paperSenderMessage, {
                  [classes.paperFriendMessage]: fkSenderId !== userId,
                })} >
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
