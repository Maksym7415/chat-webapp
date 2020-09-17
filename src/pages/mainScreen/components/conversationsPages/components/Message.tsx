import React, { useRef } from 'react';
import { Paper, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { FileData } from '../../../../../redux/conversations/constants/interfaces';
import { getCurrentDay } from '../../../../../common/getCorrectDateFormat';
import { MessageProps } from '../../../interfaces';
import useStyles from '../styles/styles';
import contextMenuCallback from '../../../../../components/contextMenu/eventCallback';
import { editMessageAction, deleteMessageAction, contextMenuAction } from '../../../../../redux/common/commonActions';
import DefaultAvatar from '../../../../../components/defaultAvatar';
import contextMenuConfig from './contextMenuConfig';

export default function Message({
  fkSenderId, message, id, sendDate, User, Files, userId, isShowAvatar,
}: MessageProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleEditMessage = () => {
    dispatch(editMessageAction(true, id));
    dispatch(contextMenuAction({
      yPos: '',
      xPos: '',
      isShowMenu: false,
      messageId: 0,
      config: [],
    }));
  };

  const handleDeleteMessage = () => {
    dispatch(deleteMessageAction(true, id));
    dispatch(contextMenuAction({
      yPos: '',
      xPos: '',
      isShowMenu: false,
      messageId: 0,
      config: [],
    }));
  };

  return (
    <div className={`conversations__message-container flex ${fkSenderId === userId ? 'conversations__message-container-margin-sender' : 'conversations__message-container-margin-friend'}`}>
      {isShowAvatar && (User.userAvatar ? <Avatar className={classes.messageAvatar} src={`http://localhost:8081/${User.userAvatar}`} /> : <DefaultAvatar name={`${User.firstName} ${User.lastName}`} width='30px' height='30px' fontSize='0.7rem' />)}
      <div onContextMenu={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, id, contextMenuConfig(fkSenderId === userId, handleDeleteMessage, handleEditMessage), dispatch)} onClick={(event: React.MouseEvent<HTMLElement>) => contextMenuCallback(event, id, [], dispatch)} className='conversations__message-file-container'>
        {Files && !!Files.length && (
          <div className='conversations__message-image-container'>
            {
              Files.map((file: FileData) => (['png', 'jpg', 'jpeg'].includes(file.extension)
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
        )}
        {message && <Paper
          elevation={1}
          className={clsx(fkSenderId === userId ? classes.paperSenderMessage
            : classes.paperFriendMessage, Files && Files.length ? classes.fullWidth : null)}
        >
          <p className='conversations__message-text'>{message}</p>
          <div className='conversations__user-name-date-container relative'>
            {userId !== User.id ? <p className='conversations__message-info-text'>{User.tagName}</p> : <div className='conversations__message-info-text' style={{ height: '2px' }}></div>}
            <p className='conversations__message-info-time'>{getCurrentDay(new Date(sendDate))}</p>
          </div>
        </Paper>}
      </div>
    </div>
  );
}
