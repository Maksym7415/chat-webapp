/* eslint-disable @typescript-eslint/indent */
import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper, TextField, InputAdornment, IconButton, Input,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import SendIcon from '@material-ui/icons/Send';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  conversationUserHistoryActionRequest,
  createNewChatAction,
  getConversationIdAction,
  clearConversationData,
} from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import { getCurrentDay, fullDate } from '../../../../common/getCorrectDateFormat';
import socket from '../../../../socket';
import useStyles from './styles/styles';
import AddFiles from './addFilesComponent';
import './styles/styles.scss';
import {
  Files, CurrentConversationMessages, ScrollValue, MessageValue, Pagination,
} from './interfaces';

const scrollTop = (ref: any) => {
  // if (isScrollTo) {
  //   return mainGrid.scrollTo({
  //     top: position + ref.current?.offsetHeight,
  //     behavior: 'smooth',
  //   });
  // }
  // if (position === 0 && offset !== 0) {
  //   return mainGrid.scrollTo({
  //     top: position || 10,
  //     behavior: 'smooth',
  //   });
  // }

  // ref.current?.scrollIntoView({ behavior: 'smooth' });
  let element = document.getElementById('messages');
  element?.scrollTo({
    top: 10,
    behavior: 'smooth',
  });
};
const getCurrentScrollTop = (element: any) => element.scrollTop;

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isCreateChat = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.createConversation.success.data);
  const opponentId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.opponentId.id);
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const id = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});
  const [message, setMessage] = useState<MessageValue>({ 0: '' });
  const [files, setFiles] = useState<Files>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);

  const ref = useRef(null);

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

  const socketSendMessageCommonFun = (conversationId: undefined | number) => socket.emit('chats', ({
    conversationId,
    message: {
      message: message[id], fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
    },
    userId,
    opponentId,
  }), (success: boolean) => {
    if (success) setMessage({ ...message, [id]: '' });
  });

  const handleSendMessage = () => {
    if (!id) {
      return socketSendMessageCommonFun(undefined);
    }
    socketSendMessageCommonFun(id);
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!id) {
        return socketSendMessageCommonFun(undefined);
      }
      socketSendMessageCommonFun(id);
    }
  };

  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (allMessages[id]?.length % 15 === 0 && element.scrollTop === 0) {
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

  useEffect(() => () => {
    dispatch(clearConversationData());
  }, []);

  useEffect(() => {
    setIsInputState(false);
  }, [files]);

  useEffect(() => {
    if (!allMessages[id]) {
      dispatch(conversationUserHistoryActionRequest(id, 0));
    }
    return () => {
      if (!id) {
        dispatch(createNewChatAction({ userId: 0, opponentId: 0 }));
      }
    };
  }, [id]);

  useEffect(() => {
    scrollTop(ref);
    setLocalPagination((value) => ({ ...value, [id]: pagination.currentPage }));
    setAllMessages((messages) => ({ ...messages, [id]: [...messageHistory, ...(messages[id] === undefined ? [] : messages[id])], 0: [] }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && id in lastMessage) setAllMessages((messages) => ({ ...messages, [id]: [...messages[id], lastMessage[id]] }));
  }, [lastMessage]);

  useEffect(() => {
    if (opponentId) {
      dispatch(getConversationIdAction(0));
      if (isCreateChat.length) {
        dispatch(getConversationIdAction(isCreateChat[0].id));
      }
    }
  }, [isCreateChat]);

  return (
    <div
      // container
      // item xs={8}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className='conversations__container'
      onScroll={scrollHandler}
      id='messages'
    >
      <Grid item xs={12} >
        <>
          {console.log(opponentId, allMessages)}
          {Object.keys(allMessages).length === 1 && !opponentId ? <p>Выберите чат</p> : id === 0 ? <p> Отправьте новое соообщение, чтобы создать чат</p>
            : allMessages[id] && allMessages[id].map(({
              fkSenderId, message, id, sendDate, User, Files,
            }) => (
                <div className='conversations__message-container' key={id}>
                  {
                    Files && !!Files.length && <div className='conversations__message-image-container'>
                      {
                        Files.map((file) => (['png', 'jpg', 'jpeg'].includes(file.extension)
                          ? <img
                            key={file.fileStorageName}
                            className='conversations__message-image-item'
                            src={`http://localhost:8081/${file.fileStorageName}.${file.extension}`}
                            alt={file.fileStorageName}
                          />
                          : <Paper
                            className={classes.paperFileContainer}
                            key={file.fileStorageName}
                          >
                            <InsertDriveFileIcon />
                            <p>{file.fileUserName}</p>
                          </Paper>))
                      }
                    </div>
                  }
                  {message && <Paper
                    elevation={1}
                    className={clsx(classes.paperSenderMessage, {
                      [classes.paperFriendMessage]: fkSenderId !== userId,
                    })}
                  >
                    <p className='conversations__message-text'>{message}</p>
                    <div className='conversations__user-name-date-container relative'>
                      {userId !== User.id && <p className='conversations__message-info-text'>{User.tagName}</p>}
                      <p className='conversations__message-info-time absolute'>{getCurrentDay(new Date(sendDate))}</p>
                    </div>
                  </Paper>}
                </div>
              ))
          }
          <div style={{ height: '50px' }} ref={ref}></div>
        </>
      </Grid>
      {(!!id || !!opponentId)
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
