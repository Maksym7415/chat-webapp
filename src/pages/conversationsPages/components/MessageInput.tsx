import React, { useState, useEffect } from 'react';
import {
  Input, InputAdornment, IconButton, Typography,
} from '@material-ui/core';
import { History } from 'history';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { socket } from '../../../socket';
import { fullDate } from '../../../common/getCorrectDateFormat';
import { RootState } from '../../../redux/reducer';
import useStyles from '../styles/styles';
import {
  MessageInputProps, MessageValue, DeleteMessageSocketResponse, CurrentConversationMessages, MessageSocketEmit,
} from '../../mainScreen/interfaces';
import { Messages } from '../../../redux/conversations/constants/interfaces';
import { editMessageAction, deleteMessageAction } from '../../../redux/common/commonActions';

export default function MessageInput({
  conversationId, allMessages, setAllMessages, userId, firstName, opponentId, openFileDialog, history,
}: MessageInputProps<History>) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<MessageValue>({ 0: '' });
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const messageEdit = useSelector(({ commonReducer }: RootState) => commonReducer.messageEdit);
  const [editedMessage, setEditedMessage] = useState<string>('');

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

  const socketSendMessageCommonFun = (actionType: string, id?: number) => {
    console.log('SEND MESSAGE', {
      conversationId: id,
      message: {
        message: message[conversationId], sendDate: fullDate(new Date()), messageType: 'Text',
      },
      actionType,
      userId,
      messageId: messageEdit.messageId,
      // opponentId,
    });

    function emit(emitData: MessageSocketEmit) {
      socket.emit('message', (emitData), (success: boolean, actionType: string) => {
        console.log(success);
        if (success && actionType === 'new') setMessage({ ...message, [conversationId]: '' });
        if (success && actionType === 'edit') {
          dispatch(editMessageAction(false, null));
          setMessage({ ...message, [conversationId]: '' });
        }
      });
    }

    const emitData: MessageSocketEmit = {
      conversationId: id,
      actionType,
      userId,
    };
    switch (actionType) {
      case 'new': {
        return emit({
          ...emitData,
          actionType,
          message: {
            message: message[conversationId], sendDate: fullDate(new Date()), messageType: 'Text',
          },
        });
      }
      case 'edit': {
        return emit({
          ...emitData,
          message: {
            message: message[conversationId], messageType: 'Text',
          },
          messageId: messageEdit.messageId,
        });
      }
      case 'delete': {
        console.log('conversationId', conversationId);
        return emit({
          ...emitData,
          messageId: messageEdit.messageId,
        });
      }
      default:
    }
  };

  const handleSendMessage = () => {
    if (!message[conversationId]) return;
    if (!conversationId) {
      return socketSendMessageCommonFun('new');
    }
    if (messageEdit.isEdit) return socketSendMessageCommonFun('edit', conversationId); // dispatch(editMessageAction(false, null));
    socketSendMessageCommonFun('new', conversationId);
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleClearEditMessage();
    }
    if (event.key === 'Enter') {
      if (!message[conversationId]) return;
      if (!conversationId) {
        return socketSendMessageCommonFun('new');
      }
      if (messageEdit.isEdit) {
        dispatch(editMessageAction(false, null));
        return socketSendMessageCommonFun('edit', conversationId);
      }
      socketSendMessageCommonFun('new', conversationId);
    }
  };

  const handleClearEditMessage = () => {
    dispatch(editMessageAction(false, null));
    setMessage({ ...message, [conversationId]: '' });
    setEditedMessage('');
  };

  useEffect(() => {
    if (messageEdit.isEdit) {
      const resultMessage = allMessages[conversationId].find((message) => message.id === messageEdit.messageId);
      setEditedMessage(resultMessage ? resultMessage.message : '');
      setMessage(() => ({ ...message, [conversationId]: resultMessage ? resultMessage.message : '' }));
    }
    if (messageEdit.isDelete) {
      socketSendMessageCommonFun('delete', conversationId);
      dispatch(deleteMessageAction(false, null));
    }
  }, [messageEdit]);

  // useEffect(() => {
  //   socket.on('deleteMessage', ({ conversationId, messageId }: DeleteMessageSocketResponse) => {
  //     setAllMessages((messages: CurrentConversationMessages) => ({ ...messages, [conversationId]: messages[conversationId].filter((message: Messages) => (message.id !== messageId)) }));
  //   });
  // }, []);

  useEffect(() => {
    handleClearEditMessage();
  }, [conversationId]);

  return (
    <>
      {messageEdit.isEdit && <div className='conversations__send-message-text conversations__send-message-shadow'>
        <EditIcon color='primary' className='mr-10' />
        <div className='flex-col conversations__send-message-text-title-wrapper'>
          <Typography color='primary'>Edit Message</Typography>
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
      <div className={messageEdit.isEdit ? 'conversations__send-message-input' : 'conversations__send-message-input conversations__send-message-shadow'}>
          <Input
          onKeyDown={sendMessageByKey}
          value={message[conversationId] || ''}
          onChange={handleChangeMessage}
          disableUnderline
          fullWidth
          placeholder='Type message...'
          endAdornment={(
            (message[conversationId] || '') === ''
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
