import React from 'react';
import { Paper, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { FileData } from '../../../../../redux/conversations/constants/interfaces';
import { getCurrentDay } from '../../../../../common/getCorrectDateFormat';
import { MessageProps } from '../interfaces';
import useStyles from '../styles/styles';

export default function Message({
  fkSenderId, message, id, sendDate, User, Files, userId, isShowAvatar,
}: MessageProps) {
  const classes = useStyles();

  return (
    <div className={`conversations__message-container flex ${fkSenderId === userId ? 'conversations__message-container-margin-sender' : 'conversations__message-container-margin-friend'}`}>
      {isShowAvatar && <Avatar className={classes.messageAvatar} src={`http://localhost:8081/${User.userAvatar}`} />}
      <div className='conversations__message-file-container'>
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
                            <InsertDriveFileIcon/>
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
