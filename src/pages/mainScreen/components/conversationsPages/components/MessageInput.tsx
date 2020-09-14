import React, { useState, useEffect } from 'react';
import {
  Input, InputAdornment, IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../../../../socket';
import { fullDate } from '../../../../../common/getCorrectDateFormat';
import { RootState } from '../../../../../redux/reducer';
import useStyles from '../styles/styles';
import { MessageInputProps, MessageValue } from '../interfaces';
import { editMessageAction, deleteMessageAction } from '../../../../../redux/common/commonActions';

export default function MessageInput({
  conversationId, setAllMessages, userId, firstName, opponentId, openFileDialog,
}: MessageInputProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<MessageValue>({ 0: '' });
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const messageEdit = useSelector(({ commonReducer }: RootState) => commonReducer.messageEdit);

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

  const socketSendMessageCommonFun = (id: undefined | number) => socket.emit('chats', ({
    conversationId: id,
    message: {
      message: message[conversationId], fkSenderId: userId, sendDate: fullDate(new Date()), messageType: 'Text',
    },
    messageId: messageEdit.messageId,
    userId,
    opponentId,
  }), (success: boolean) => {
    if (success) setMessage({ ...message, [conversationId]: '' });
  });

  const handleSendMessage = () => {
    if (!conversationId) {
      return socketSendMessageCommonFun(undefined);
    }
    socketSendMessageCommonFun(conversationId);
    if (messageEdit.isEdit) dispatch(editMessageAction(false, null));
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (!conversationId) {
        return socketSendMessageCommonFun(undefined);
      }
      socketSendMessageCommonFun(conversationId);
      dispatch(editMessageAction(false, null));
    }
  };

  useEffect(() => {
    if (messageEdit.isEdit) setMessage({ ...message, [conversationId]: 'hello' });
    if (messageEdit.isDelete) {
      socket.emit('chats', ({
        conversationId,
        isDeleteMessage: true,
        messageId: messageEdit.messageId,
      }), (success: boolean) => {
        if (success) console.log('deleted');
        // setAllMessages((messages) => ({ ...messages, [conversationId]: messages[conversationId].map((message) => (message.id === lastMessage[conversationId].id ? { ...message, message: lastMessage[conversationId].message } : message)) }));
      });
      dispatch(deleteMessageAction(false, null));
    }
  }, [messageEdit]);

  return (
    <div className='conversations__send-message-input'>
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
  );
}
