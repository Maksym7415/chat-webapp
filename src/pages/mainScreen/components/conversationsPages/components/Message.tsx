/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Paper, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { FileData, Messages } from '../../../../../redux/conversations/constants/interfaces';
import { getCurrentDay } from '../../../../../common/getCorrectDateFormat';
import { MessageProps } from '../../../interfaces';
import useStyles from '../styles/styles';
import contextMenuCallback from '../../../../../components/contextMenu/eventCallback';
import {
  editMessageAction, deleteMessageAction, contextMenuAction, showDialogAction,
} from '../../../../../redux/common/commonActions';
import DefaultAvatar from '../../../../../components/defaultAvatar';
import contextMenuConfig from './contextMenuConfig';
import { updateConversationData } from '../../../../../redux/conversations/constants/actionConstants';
import languages from '../../../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';

export default function Message({
  messageData, isShowAvatar, userId, conversationId, allMassages,
}: any) {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const activeConversationType = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationId.type);
  const conversationsList = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationsList.success.data);

  // FUNCTIONS

  const closeContextMenuAction = () => dispatch(contextMenuAction({
    yPos: '',
    xPos: '',
    isShowMenu: false,
    messageId: 0,
    config: [],
  }));

  const handleEditMessage = () => {
    dispatch(editMessageAction(true, messageData.id));
    closeContextMenuAction();
  };

  const handleDeleteMessage = () => {
    const filterAllMassages = allMassages.filter((message: Messages) => (message.id !== messageData.id && !message.component));

    updateConversationData(
      {
        mode: 'deleteMessage',
        conversationId,
        messages: filterAllMassages.length ? [filterAllMassages[filterAllMassages.length - 1]] : [],
        conversationsList,
      },
      dispatch,
    );
    dispatch(deleteMessageAction(true, messageData.id));
    closeContextMenuAction();
  };

  const handleShareMessage = () => {
    dispatch(showDialogAction('Share Message', [{
      Files: messageData.Files,
      User: messageData.User,
      fkSenderId: messageData.fkSenderId,
      id: messageData.id,
      isEditing: messageData.isEditing,
      message: messageData.message,
      sendDate: messageData.sendDate,
    }]));
    closeContextMenuAction();
  };
  console.log(messageData, 'messageData.');
  return (
    <div className={`conversations__message-container flex ${messageData.fkSenderId === userId ? 'conversations__message-container-margin-sender' : 'conversations__message-container-margin-friend'}`}>
      {isShowAvatar && (messageData.User.userAvatar ? <Avatar className={classes.messageAvatar} src={`${process.env.REACT_APP_BASE_URL}/${messageData.User.userAvatar}`} /> : <DefaultAvatar name={`${messageData.User.firstName} ${messageData.User.lastName}`} width='30px' height='30px' fontSize='0.7rem' />)}
      <div onContextMenu={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, messageData.id, contextMenuConfig(lang, messageData.fkSenderId === userId, handleDeleteMessage, handleEditMessage, handleShareMessage), dispatch)} onClick={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, messageData.id, [], dispatch)} className='conversations__message-file-container'>
        {messageData.Files && !!messageData.Files.length && (
          <div className='conversations__message-image-container'>
            {
              messageData.Files.map((file: FileData) => (['png', 'jpg', 'jpeg'].includes(file.extension)
                ? <img
                  key={file.fileStorageName}
                  className='conversations__message-image-item'
                  src={`${process.env.REACT_APP_BASE_URL}/${file.fileStorageName}.${file.extension}`}
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
        )}
        {messageData.message && <Paper
          elevation={1}
          className={clsx(messageData.fkSenderId === userId ? classes.paperSenderMessage
            : classes.paperFriendMessage, messageData.Files && messageData.Files.length ? classes.fullWidth : null)}
        >
          {messageData.isEdit && <p className={classes.edited}>{languages[lang].generals.edited}</p>}
          <div className='conversations__user-name-date-container relative'>
            {activeConversationType !== 'Dialog' ? <p className='conversations__message-info-text'>{messageData.User.tagName}</p> : <div className='conversations__message-info-text' style={{ height: '2px' }}></div>}
            <p className='conversations__message-info-time'>{getCurrentDay(new Date(messageData.sendDate), true)}</p>
          </div>
          <p className='conversations__message-text'>{messageData.message}</p>
        </Paper>}
      </div>
    </div>
  );
}
