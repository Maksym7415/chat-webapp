import React, { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper, TextField, InputAdornment, IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { conversationUserHistoryActionRequest, getConversationIdAction } from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import { Messages } from '../../../../redux/conversations/constants/interfaces';
import { getCurrentDay, fullDate } from '../../../../common/getCorrectDateFormat';
import socket from '../../../../socket';
import useStyles from '../../styles/styles';
import AddFiles from './addFilesComponent';

interface CurrentConversationMessages {
  [key: number]: Array<Messages>
}

interface ScrollValue {
  [key:number]: number
}

interface MessageValue {
  [key: number]: string
}

interface Pagination {
  [key: number]: number
}

const scrollTop = (ref: any, mainGrid: any, offset: number, position: number, isScrollTo: boolean) => {
  if (isScrollTo) {
    return mainGrid.scrollTo({
      top: position,
      // behavior: 'smooth',
    });
  }
  if (mainGrid.scrollTop === 0 && offset !== 0) {
    return mainGrid.scrollTo({
      top: position,
      // behavior: 'smooth',
    });
  }
  if (ref.current) ref.current.scrollIntoView();
  // ref.current.scrollIntoView({ behavior: 'smooth' });
};

const getCurrentScrollTop = (element: any) => element.scrollTop;

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const id = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localMessageHistory, setLocalmessageHistory] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});
  const [scrollValue, setScrollValue] = useState<ScrollValue>({});
  const [message, setMessage] = useState<MessageValue>({ 0: '' });

  const ref = React.useRef(null);
  useMemo(() => setAllMessages((prev) => {
    if (prev[id] && prev[id].length) return { ...prev };
    return ({ ...prev, [conversationId]: [] });
  }), [conversationId]);
  // useMemo(() => scrollTop(ref), [conversationId]);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setMessage({ ...message, [id]: event.target.value });
    const user = {
      userId,
      firstName,
      conversationId: id,
      isTyping: false,
    };
    if (!typing[conversationId]) {
      socket.emit('typingState', user, id);
    } else {
      socket.emit('typingState', user);
    }
  };

  const handleSendMessage = () => {
    socket.emit('chats', ({
      conversationId,
      message: {
        message, fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
      },
      userId,
    }), (success: boolean) => {
      if (success) setMessage({ ...message, [id]: '' });
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
        if (success) setMessage({ ...message, [id]: '' });
      });
    }
  };

  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    setScrollValue((prevValue) => ({ ...prevValue, [id]: getCurrentScrollTop(element) }));
    if (element.scrollTop === 0 && localMessageHistory[id] && localMessageHistory[id].length === 15 && allMessages[id]) {
      dispatch(conversationUserHistoryActionRequest(id, localPagination[id] + 15));
    }
  };

  // useEffect(() => {
  //   // dispatch(conversationUserHistoryActionRequest(1));
  //   scrollTop(ref);
  // }, [dispatch, conversationId]);

  useEffect(() => {
    let element = document.getElementById('messages');
    if (element) {
      scrollTop(ref, element, pagination.currentPage, scrollValue[id], true);
    }
    if (!Object.keys(allMessages).includes(`${id}`)) dispatch(conversationUserHistoryActionRequest(id, 0));
  }, [id]);

  useEffect(() => {
    setAllMessages((prev) => {
<<<<<<< HEAD
      return { ...prev, [id]: [...messageHistory, ...prev[id]] }
=======
      console.log(allMessages, prev);
      return { ...prev, [id]: [...messageHistory, ...prev[id]] };
>>>>>>> 52a5747d73e383ca9f64ebfb7e79b8455db5c214
    });
    setLocalmessageHistory((prev) => ({ ...prev, [id]: [...messageHistory] }));
    setLocalPagination((prev) => ({ ...prev, [id]: pagination.currentPage }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && conversationId in lastMessage) setAllMessages((prev) => ({ ...prev, [conversationId]: [...prev[conversationId], lastMessage[conversationId]] }));
  }, [lastMessage]);

  useEffect(() => {
    let element = document.getElementById('messages');
    if (element) {
      scrollTop(ref, element, pagination.currentPage, 10, false);
    }
  }, [allMessages]);

  return (
    <Grid className='overflowY-auto' id='messages' style={{ maxHeight: '87vh' }} container item xs={8} onScroll={scrollHandler}>
      <Grid item xs={12}>
        {

          allMessages[id] && allMessages[id].map(({
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

      {conversationId !== 0 && <Grid item xs={12}>
        <div className='chat__send-message-input'>
          <TextField
            fullWidth
            onKeyDown={sendMessageByKey}
            InputProps={{
              endAdornment: (
<<<<<<< HEAD
                (message[id] || '') === '' 
                  ? 
                  <InputAdornment position="end"> 
                    <AddFiles /> 
                  </InputAdornment> 
                  : 
                  <InputAdornment position="end">
                    <IconButton /*aria-label="toggle password visibility"*/ onClick={handleSendMessage}>
=======
                (message[id] || '') === ''
                  ? <InputAdornment position="end">
                    <AddFiles />
                  </InputAdornment>
                  : <InputAdornment position="end">
                    <IconButton /* aria-label="toggle password visibility" */ onClick={handleSendMessage}>
>>>>>>> 52a5747d73e383ca9f64ebfb7e79b8455db5c214
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
              ),
            }}
            label='Type message'
            value={message[id] || ''}
            onChange={handleChangeMessage}
          />
        </div>
      </Grid>}
    </Grid>

  );
}
