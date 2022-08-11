/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState, useEffect } from 'react';
import {
  Input, InputAdornment, IconButton, Typography,
} from '@material-ui/core';
import { History } from 'history';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import CloseIcon from '@material-ui/icons/Close';
import socket from '../../../../../socket';
import { fullDate } from '../../../../../common/getCorrectDateFormat';
import useStyles from '../styles/styles';
import {
  MessageInputProps, MessageValue, DeleteMessageSocketResponse, CurrentConversationMessages,
} from '../../../interfaces';
import { Messages } from '../../../../../redux/conversations/constants/interfaces';
import { editMessageAction, deleteMessageAction, shareMessageAction } from '../../../../../redux/common/commonActions';
import languages from '../../../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';

export default function MessageInput({
  conversationId, allMessages, setAllMessages, userId, firstName, opponentId, openFileDialog,
}: MessageInputProps<History>) {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const typing = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationTypeState);
  const messageEdit = useAppSelector(({ commonReducer }) => commonReducer.messageEdit);
  const sheraMessages = useAppSelector(({ commonReducer }) => commonReducer.sheraMessages);

  // STATES
  const [sheredMessages, setSheredMessages] = useState<any>([]);
  const [editedMessage, setEditedMessage] = useState<string>('');
  const [message, setMessage] = useState<any>({ 0: '' });

  // FUNCTIONS
  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();

    setMessage({ ...message, [conversationId]: event.target.value });
    const user = {
      userId,
      firstName,
      conversationId,
      isTyping: false,
    };
    if (!typing[conversationId]) {
      socket.emit('typingState', user, conversationId);
    } else {
      socket.emit('typingState', user);
    }
  };

  const socketSendMessageCommonFun = (id: undefined | number, messageSend?: any, forwardedFromId?: number) => socket.emit('chats', ({
    conversationId: id,
    message: messageSend,
    messageId: messageEdit.messageId,
    userId,
    opponentId,
    forwardedFromId: forwardedFromId || null,
  }), (success: boolean) => {
    if (success) setMessage({ ...message, [conversationId]: '' });
  });

  const handleSendMessage = () => {
    if (!message[conversationId] && !sheredMessages.length) return;
    const messageSend: any = {
      message: message?.message || message[conversationId], fkSenderId: message?.User?.id || userId, messageType: 'Text',
    };
    // if (!conversationId) {
    //   return socketSendMessageCommonFun(undefined);
    // }
    if (sheredMessages.length) {
      sheredMessages.map((message: any) => {
        messageSend.sendDate = fullDate(new Date());
        socketSendMessageCommonFun(conversationId, messageSend);
        return message;
      });
      dispatch(shareMessageAction([]));
    }
    if (message[conversationId]) {
      if (messageEdit.isEdit) {
        socketSendMessageCommonFun(conversationId, messageSend);
      } else {
        messageSend.sendDate = fullDate(new Date());
        socketSendMessageCommonFun(conversationId, messageSend);
      }
    }
    if (messageEdit.isEdit) dispatch(editMessageAction(false, null));
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!message[conversationId] && !sheredMessages.length) return;
      if (!conversationId) {
        return socketSendMessageCommonFun(undefined);
      }
      socketSendMessageCommonFun(conversationId);
      dispatch(editMessageAction(false, null));
    }
  };

  const handleClearSheraMessages = () => {
    dispatch(shareMessageAction([]));
    setSheredMessages([]);
  };

  const handleClearEditMessage = () => {
    dispatch(editMessageAction(false, null));
    setMessage({ ...message, [conversationId]: '' });
    setEditedMessage('');
  };

  const escFunction = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      handleClearEditMessage();
    }
  };

  // USEEFFECTS
  useEffect(() => {
    if (messageEdit.isEdit) {
      const resultMessage = allMessages[conversationId].find((message) => message.id === messageEdit.messageId);
      setEditedMessage(resultMessage ? resultMessage.message : '');
      setMessage(() => ({ ...message, [conversationId]: resultMessage ? resultMessage.message : '' }));
    }
    if (messageEdit.isDelete) {
      socket.emit('chats', ({
        conversationId,
        isDeleteMessage: true,
        messageId: messageEdit.messageId,
      }), (success: boolean) => {
        // if (success) console.log('deleted');
      });
      dispatch(deleteMessageAction(false, null));
    }
  }, [messageEdit]);

  useEffect(() => {
    socket.on('deleteMessage', ({ conversationId, messageId }: DeleteMessageSocketResponse) => {
      setAllMessages((messages: CurrentConversationMessages) => ({ ...messages, [conversationId]: messages[conversationId].filter((message: Messages) => (message.id !== messageId)) }));
    });
  }, []);

  useEffect(() => {
    handleClearEditMessage();
  }, [conversationId]);

  useEffect(() => {
    setSheredMessages(sheraMessages);
  }, [sheraMessages]);

  useEffect(() => {
    document.addEventListener('keydown', escFunction);
    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, []);

  return (
    <>
      {messageEdit.isEdit && <div className='conversations__send-message-text conversations__send-message-shadow'>
        <EditIcon color='primary' className='mr-10' />
        <div className='flex-col conversations__send-message-text-title-wrapper'>
          <Typography color='primary'>{languages[lang].generals.editMessage}</Typography>
          <p className='conversations__edit-message-paragraph'>{editedMessage}</p>
        </div>
        <div className='ml-auto pd-right-30'>
          <IconButton
            style={{ width: '20px', height: '20px' }}
            onClick={handleClearEditMessage}
          >
            <CloseIcon style={{ width: '20px', height: '20px' }} />
          </IconButton>
        </div>
      </div>}
      {sheredMessages.length ? <div className='conversations__send-message-text conversations__send-message-shadow'>
        <ShareIcon color='primary' className='mr-10' />
        <div className='flex-col conversations__send-message-text-title-wrapper'>
          <Typography color='primary'>{languages[lang].generals.shareMessage}</Typography>
          <p className='conversations__edit-message-paragraph'>{sheredMessages[0].message}</p>
        </div>
        <div className='ml-auto pd-right-30'>
          <IconButton
            style={{ width: '20px', height: '20px' }}
            onClick={handleClearSheraMessages}
          >
            <CloseIcon style={{ width: '20px', height: '20px' }} />
          </IconButton>
        </div>
      </div> : null}
      <div className={(messageEdit.isEdit || sheredMessages.length) ? 'conversations__send-message-input' : 'conversations__send-message-input conversations__send-message-shadow'}>
        <Input
          onKeyDown={sendMessageByKey}
          value={message[conversationId] || ''}
          onChange={handleChangeMessage}
          disableUnderline
          fullWidth
          placeholder={`${languages[lang].generals.typeMessage}...`}
          endAdornment={(
            ((message[conversationId] || '') === '') && !sheredMessages.length
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
      </div>
    </>
  );
}
