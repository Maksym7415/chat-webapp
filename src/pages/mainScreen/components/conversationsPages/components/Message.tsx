import React from 'react';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { FileData } from '../../../../../redux/conversations/constants/interfaces';
import { getCurrentDay } from '../../../../../common/getCorrectDateFormat';
import { MessageProps } from '../interfaces';
import useStyles from '../styles/styles';

export default function Message(props: MessageProps) {
  const {
    fkSenderId, message, id, sendDate, User, Files, userId,
  } = props;
  const classes = useStyles();

  return (
    <div className='conversations__message-container'>
                {
                  Files && !!Files.length && <div className='conversations__message-image-container'>
                    {console.log(Files)}
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
  );
}
