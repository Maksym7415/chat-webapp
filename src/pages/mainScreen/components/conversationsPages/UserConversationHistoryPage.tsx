import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, InputAdornment, IconButton, Input,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { conversationUserHistoryActionRequest } from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import Message from './components/Message';
import { fullDate } from '../../../../common/getCorrectDateFormat';
import socket from '../../../../socket';
import useStyles from './styles/styles';
import AddFiles from './components/addFilesComponent';
import './styles/styles.scss';
import {
  Files, CurrentConversationMessages, ScrollValue, MessageValue, Pagination,
} from './interfaces';

const scrollTop = (ref: any, mainGrid: any, offset: number, position: number, isScrollTo: boolean) => {
  if (isScrollTo) {
    return mainGrid.scrollTo({
      top: position + ref.current?.offsetHeight,
      behavior: 'smooth',
    });
  }
  if (position === 0 && offset !== 0) {
    return mainGrid.scrollTo({
      top: position || 10,
      behavior: 'smooth',
    });
  }

ref.current?.scrollIntoView({ behavior: 'smooth' });
};
const getCurrentScrollTop = (element: any) => element.scrollTop;

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const id = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localMessageHistory, setLocalmessageHistory] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});
  const [scrollValue, setScrollValue] = useState<ScrollValue>({});
  const [message, setMessage] = useState<MessageValue>({ 0: '' });
  const [files, setFiles] = useState<Files>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);

  const ref = useRef(null);

  useMemo(() => setAllMessages((prev) => {
    if (prev[id] && prev[id].length) {
      return { ...prev };
    }
    return ({ ...prev, [id]: [] });
  }), [id]);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setMessage({ ...message, [id]: event.target.value });
    const user = {
      userId,
      firstName,
      conversationId: id,
      isTyping: false,
    };
    if (!typing[id]) {
      socket.emit('typingState', user, id);
    } else {
      socket.emit('typingState', user);
    }
  };

  const handleSendMessage = () => {
    socket.emit('chats', ({
      conversationId: id,
      message: {
        message: message[id], fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
      },
      userId,
    }), (success: boolean) => {
      if (success) setMessage({ ...message, [id]: '' });
    });
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      socket.emit('chats', ({
        conversationId: id,
        message: {
          message: message[id], fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
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

  const handleOpenDialog = (isOpen: boolean) => {
    if (!isOpen) {
      setFiles({});
    }
    setIsOpenDialog(isOpen);
  };

  const openFileDialog = () => {
    const element = inputRef.current;
    if (element) element.click();
  };

  const stopEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
    handleOpenDialog(true);
    const file: FileList | null = (event.target as HTMLInputElement).files;
    if (file) {
      const result: Files = {};
      Object.values(file).forEach((element) => {
        const key = uuidv4();
        result[key] = element;
      });
      setFiles((prev) => ({ ...prev, ...result }));
    }
  };

  const onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const file: FileList | null = event.target.files;
    if (file && !file.length) return;
    handleOpenDialog(true);
    console.log(file && file.length);
    if (file) {
      const result: Files = {};
      Object.values(file).forEach((element) => {
        const key = uuidv4();
        result[key] = element;
      });
      setFiles((prev) => ({ ...prev, ...result }));
    }
    setIsInputState(true);
    // event.target.value = '';
  };

  useEffect(() => {
    setIsInputState(false);
  }, [files]);

  useEffect(() => {
    if (!allMessages[id].length && id !== 0) dispatch(conversationUserHistoryActionRequest(id, 0));
  }, [id]);

  useEffect(() => {
    setAllMessages((prev) => ({ ...prev, [id]: [...messageHistory, ...prev[id]] }));
    setLocalmessageHistory((prev) => ({ ...prev, [id]: [...messageHistory] }));
    setLocalPagination((prev) => ({ ...prev, [id]: pagination.currentPage }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && id in lastMessage) setAllMessages((prev) => ({ ...prev, [id]: [...prev[id], lastMessage[id]] }));
  }, [lastMessage]);

  useEffect(() => {
    let element = document.getElementById('messages');
    if (element) {
      let isScrolling = false;
      if (scrollValue[id]) {
        isScrolling = true;
      }
      scrollTop(ref, element, localPagination[id], scrollValue[id], isScrolling);
    }
  }, [allMessages]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className='conversations__container'
    >
      <Grid item xs={12} id='messages' onScroll={scrollHandler} >
        <>
        {

          allMessages[id] && allMessages[id].map(({
            fkSenderId, message, id, sendDate, User, Files,
          }) => <Message key={id} fkSenderId={fkSenderId} message={message} id={id} sendDate={sendDate} User={User} Files={Files} userId={userId} />)
        }
        <div style={{ height: '50px' }} ref={ref}></div>
        </>
      </Grid>

      {id !== 0
        && <div className='conversations__send-message-input'>
          <Input
            onKeyDown={sendMessageByKey}
            value={message[id] || ''}
            onChange={handleChangeMessage}
            disableUnderline
            fullWidth
            placeholder='Type message...'
            endAdornment={(
              (message[id] || '') === ''
                ? (
                  <InputAdornment position="end">
                    <IconButton
                      classes={{ root: classes.iconButton }}
                      onClick={openFileDialog} color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </InputAdornment>
                )
                : (
                  <InputAdornment position="end">
                    <IconButton
                      classes={{ root: classes.iconButton }}
                      onClick={handleSendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                )
            )}
          />
        </div>}
      {!isInputState && <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        multiple
        onChange={onFilesAdded}
      />}
      <AddFiles files={files} isOpen={isOpenDialog} handleOpenDialog={handleOpenDialog} handleAddFile={openFileDialog} />
    </div>
  );
}
