/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useLayoutEffect, useState } from 'react';
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

type TSettings = {
  typeMessage: string,
  classNames: {
    root: string,
    rootPaper: string,
    wrapperMessage?: string,
  }
};

function Message({
  messageData, isShowAvatar, userId, conversationId, allMassages,
}: any) {
  // HOOKS
  const classes = useStyles();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const activeConversationType = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationId.type);
  const conversationsList = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationsList.success.data);

  // STATES
  const [settings, setSettings] = useState<TSettings>({
    typeMessage: '',
    classNames: {
      root: '',
      rootPaper: '',
    },
  });
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

  useLayoutEffect(() => {
  // shared message
    if (messageData.forwardedUser) {
      return setSettings((prev: TSettings) => ({
        ...prev,
        typeMessage: 'shared',
        classNames: {
          root: 'conversations__message-container-margin-shared',
          rootPaper: classes.paperSharedMessage,
          wrapperMessage: classes.wrapperTextMessageShared,
        },
      }));
    }

    // myMessage message
    if (messageData.fkSenderId === userId) {
      return setSettings((prev: TSettings) => ({
        ...prev,
        typeMessage: 'myMessage',
        classNames: {
          root: 'conversations__message-container-margin-sender',
          rootPaper: classes.paperSenderMessage,
        },
      }));
    }

    // otherUser message
    return setSettings((prev: TSettings) => ({
      ...prev,
      typeMessage: 'otherUser',
      classNames: {
        root: 'conversations__message-container-margin-friend',
        rootPaper: classes.paperFriendMessage,
      },
    }));
  }, []);
  console.log(isShowAvatar, 'isShowAvatar');
  return <div className={`conversations__message-container flex ${settings.classNames.root}`}>
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
          className={clsx(settings.classNames.rootPaper, {
            [classes.fullWidth]: messageData.Files && messageData.Files.length,
          })}
        >
          {messageData.isEdit && <p className={classes.edited}>{languages[lang].generals.edited}</p>}
          <div className='conversations__user-name-date-container relative'>
            {activeConversationType !== 'Dialog'
              ? <p className='conversations__message-info-text'>{messageData.forwardedUser ? languages[lang].generals.forwardedMessage : messageData.User.tagName}</p>
              : <div className='conversations__message-info-text' style={{ height: '2px' }}></div>}
            <p className='conversations__message-info-time'>{getCurrentDay(new Date(messageData.sendDate), true)}</p>
          </div>
          <div className={`conversations__message-text ${settings.classNames.wrapperMessage}`}>
            {messageData.forwardedUser && <span className={classes.wrapperMessageUserName}>{messageData.User.tagName}</span>}
            <p>{messageData.message}</p>
          </div>
        </Paper>}
      </div>
    </div>;
}

export default Message;
