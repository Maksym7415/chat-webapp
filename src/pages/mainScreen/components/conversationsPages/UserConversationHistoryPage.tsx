import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper, TextField, InputAdornment, IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { off } from 'process';
import { conversationUserHistoryActionRequest } from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import { Messages } from '../../../../redux/conversations/constants/interfaces';
import { getCurrentDay, fullDate } from '../../../../common/getCorrectDateFormat';
import socket from '../../../../socket';
import useStyles from '../../styles/styles';
import AddFiles from './addFilesComponent';
import './styles/styles.scss';

interface CurrentConversationMessages {
  [key: number]: Array<Messages>
}

interface ScrollValue {
  [key: number]: number
}

interface MessageValue {
  [key: number]: string
}

interface Pagination {
  [key: number]: number
}

const scrollTop = (ref: any, mainGrid: any, offset: number, position: number, isScrollTo: boolean) => {
  console.log(offset, mainGrid.scrollTop, position);
  if (isScrollTo) {
    return mainGrid.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }
  if (position === 0 && offset !== 0) {
    return mainGrid.scrollTo({
      top: position || 10,
      behavior: 'smooth',
    });
  }

  // if (mainGrid.scrollTop === 0 && offset !== 0) {
  //   return mainGrid.scrollTo({
  //     top: 10,
  //     // behavior: 'smooth',
  //   });
  // }

  // console.log(132);
  if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
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
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

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
      setFiles(null);
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
    setFiles(file);
  };

  const onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    handleOpenDialog(true);
    const file: FileList | null = event.target.files;
    setFiles(file);
  };

  useEffect(() => {
    let element = document.getElementById('messages');
    if (element) {
      scrollTop(ref, element, localPagination[id], scrollValue[id], true);
    }
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
      let position = 10;
      if (scrollValue[id]) {
        isScrolling = true;
        position = scrollValue[id];
      }
      scrollTop(ref, element, localPagination[id], scrollValue[id], isScrolling);
    }
  }, [allMessages]);

  const bufferToBase64 = (ArrayBuffer: [], fileName: string) => {
    const typedArray: any = new Uint8Array(ArrayBuffer);
    // const stringChar = String.fromCharCode.apply(null, typedArray);
    const stringChar = typedArray.reduce((data: any, byte: any) => data + String.fromCharCode(byte), '');
    const base64 = window.btoa(stringChar);
    console.log(base64);
    return <img src={base64} alt={fileName} />;
  };

  return (
    <Grid
      onScroll={scrollHandler}
      className='overflowY-auto'
      id={'messages'}
      style={{ maxHeight: '87vh' }}
      container item xs={8}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      {console.log(scrollValue)}
      <Grid item xs={12}>
        {

          allMessages[id] && allMessages[id].map(({
            fkSenderId, message, sendDate, User, fileData,
          }, index) => (
              <div className={classes.messagesDiv} key={index} ref={ref}>
                <Paper
                  elevation={1}
                  className={clsx(classes.paperSenderMessage, {
                    [classes.paperFriendMessage]: fkSenderId !== userId,
                  })}
                >
                  {fileData && fileData.file && bufferToBase64(fileData.file, fileData.fileName)
                    // && <img src={bufferToBase64(fileData.file)} alt={fileData.fileName} />
                  }
                  {console.log(fileData && fileData.file)}
                  <p className={classes.messageText}>{message}</p>
                  <p className={classes.messageText}>{User.tagName}</p>
                  <p className={classes.dateSender}>{getCurrentDay(new Date(sendDate))}</p>
                </Paper>
              </div>
            ))
        }
      </Grid>

      {id !== 0 && <Grid item xs={12}>
        <div className='chat__send-message-input'>
          <TextField
            fullWidth
            onKeyDown={sendMessageByKey}
            InputProps={{
              endAdornment: (
                (message[id] || '') === ''
                  ? (
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <CloudUploadIcon />
                      </IconButton>
                    </label>
                  )
                  : (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSendMessage}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  )
              ),
            }}
            label='Type message'
            value={message[id] || ''}
            onChange={handleChangeMessage}
          />
        </div>
      </Grid>}
      <input
        ref={inputRef}
        style={{ display: 'none' }}
        accept="image/*"
        id="icon-button-file"
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <AddFiles files={files} isOpen={isOpenDialog} handleOpenDialog={handleOpenDialog} handleAddFile={openFileDialog} />
    </Grid>
  );
}
