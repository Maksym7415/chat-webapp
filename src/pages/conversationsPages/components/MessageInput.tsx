import React, { useState, useEffect } from 'react';
import {
  Input, InputAdornment, IconButton, Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { RootState } from '../../../redux/reducer';
import UploadDialog from './uploadDialog';
import useStyles from '../styles/styles';
import {
  MessageInputProps, MessageValue,
  FilesSrc,
} from '../interfaces';
import { MessageFiles } from '../../../redux/common/interafaces';
import {
  editMessageAction, deleteMessageAction, clearMessageFilesAction,
} from '../../../redux/common/commonActions';
import sendMessage from '../../../socket/utils/sendMessage';
import { socket } from '../../../socket';

export default function MessageInput({
  conversationId, allMessages, files, userId, firstName, isOpenDialog, openFileDialog, handleOpenDialog, opponentId,
}: MessageInputProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<MessageValue>({ 0: '' });
  const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const messageEdit = useSelector(({ commonReducer }: RootState) => commonReducer.messageEdit);
  const messageFiles = useSelector(({ commonReducer }: RootState) => commonReducer.messageFiles);
  const [editedMessage, setEditedMessage] = useState<string>('');
  const [messageDialog, setMessageDialog] = useState<string>('');
  const [src, setSrc] = useState<FilesSrc | object>({});

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

  const sendMessageSuccessCallback = (success: boolean, actionType: string) => {
    if (success && actionType === 'new') {
      setMessage({ ...message, [conversationId]: '' });
    }
    if (success && actionType === 'edit') {
      dispatch(editMessageAction(false, null));
      setMessage({ ...message, [conversationId]: '' });
    }
  };

  const sendMessageFileSuccessCallback = (success: boolean, actionType: string) => {
    if (success && actionType === 'new') {
      setMessageDialog('');
      setSrc({});
    }
    if (success && actionType === 'edit') {
      dispatch(editMessageAction(false, null));
      setMessageDialog('');
      setSrc({});
    }
  };

  const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, meta: Array<MessageFiles> | null) => {
    if (!message[conversationId] && !meta) return;
    if (isNaN(conversationId)) {
      if (!meta) {
        return sendMessage({
          actionType: 'new', messageType: 'Text', opponentId, chatId: NaN, message, successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
        });
      }
      sendMessage({
        actionType: 'new', messageType: 'File', opponentId, chatId: NaN, message, meta, messageDialog, successCallback: sendMessageFileSuccessCallback, userId, messageId: messageEdit.messageId,
      });
      handleOpenDialog(false);
      return dispatch(clearMessageFilesAction());
    }
    if (messageEdit.isEdit) {
      return sendMessage({
        actionType: 'edit', messageType: 'Text', chatId: conversationId, message, successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
      });
    } // dispatch(editMessageAction(false, null));
    if (!meta) {
      return sendMessage({
        actionType: 'new', messageType: 'Text', chatId: conversationId, message, successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
      });
    }
    sendMessage({
      actionType: 'new', messageType: 'File', meta, message, chatId: conversationId, messageDialog, successCallback: sendMessageFileSuccessCallback, userId, messageId: messageEdit.messageId,
    });
    handleOpenDialog(false);
    return dispatch(clearMessageFilesAction());
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>, meta: Array<MessageFiles> | null) => {
    if (event.key === 'Escape') {
      handleClearEditMessage();
    }
    if (event.key === 'Enter') {
      if (!message[conversationId] && !meta) return;
      if (isNaN(conversationId)) {
        if (!meta) {
          return sendMessage({
            actionType: 'new', messageType: 'Text', opponentId, chatId: NaN, message, successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
          });
        }
        return sendMessage({
          actionType: 'new', messageType: 'File', opponentId, chatId: NaN, message, meta, messageDialog, successCallback: sendMessageFileSuccessCallback, userId, messageId: messageEdit.messageId,
        });
      }
      if (messageEdit.isEdit) {
        dispatch(editMessageAction(false, null));
        return sendMessage({
          actionType: 'edit', chatId: conversationId, messageType: 'Text', message, successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
        });
      }
      return sendMessage({
        actionType: 'new', chatId: conversationId, messageType: 'Text', message, successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
      });
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
      sendMessage({
        actionType: 'delete', chatId: conversationId, message, messageType: 'Text', successCallback: sendMessageSuccessCallback, userId, messageId: messageEdit.messageId,
      });
      dispatch(deleteMessageAction(false, null));
    }
  }, [messageEdit]);

  useEffect(() => {
    if (!messageFiles) return;
    handleSendMessage(null, messageFiles);
  }, [messageFiles]);

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
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => sendMessageByKey(event, messageFiles)}
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
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => handleSendMessage(event, null)}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              )
          )}
        />
      </div>
      <UploadDialog files={files} isOpen={isOpenDialog} handleClose={handleOpenDialog} handleAddFile={openFileDialog} message={messageDialog} src={src} setSrc={setSrc} setMessage={setMessageDialog} />
    </>
  );
}
