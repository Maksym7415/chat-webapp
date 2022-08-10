/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { fullDate } from '../../../../../common/getCorrectDateFormat';
import socket from '../../../../../socket';
import { handleGetBufferFile } from '../../../helpers/addFiles';
import UploadDialog from './uploadDialog';
import { AddFilesProps, FilesSrc } from '../../../interfaces';

// hooks
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux';

let filesCount = 0;

export default function AddFiles({
  files, isOpen, handleOpenDialog, handleAddFile, setFiles,
}: AddFilesProps) {
  // HOOKS
  const dispatch = useAppDispatch();

  // SELECTORS
  const { userId } = useAppSelector(({ authReducer }) => authReducer.tokenPayload);
  const conversationId = useAppSelector(({ userConversationReducer }) => userConversationReducer.currentChat.id);

  // STATES
  const [message, setMessage] = useState<string>('');
  const [src, setSrc] = useState<FilesSrc>({});

  // FUNCTIONS
  const handleSendFiles = (message: string) => {
    if (!files) return;

    let fileReader = new FileReader();
    if (files) {
      let filesArray = Object.values(files);
      const handleEmitFile = async (messageId: number, sendDate: string) => {
        if (filesCount === filesArray.length) {
          filesCount = 0;
        } else {
          await handleGetBufferFile(fileReader, filesArray[filesCount], filesArray[filesCount].size, filesArray[filesCount].name, userId, conversationId, socket, message, filesArray[filesCount].type, filesArray.length, dispatch, handleOpenDialog, setSrc, setMessage, messageId, sendDate);
          filesCount++;
          handleEmitFile(messageId, sendDate);
        }
      };
      socket.emit('files', {
        conversationId,
        message: {
          message,
          fkSenderId: userId,
          sendDate: fullDate(new Date()),
          messageType: 'File',
          isEdit: false,
        },
      }, (id: number) => {
        if (id) handleEmitFile(id, fullDate(new Date()));
      });
    }
  };

  return (
    <>
      <UploadDialog handleSend={handleSendFiles} isOpen={isOpen} handleClose={handleOpenDialog} files={files} handleAddFile={handleAddFile} message={message} src={src} setSrc={setSrc} setMessage={setMessage} setFiles={setFiles}/>
    </>
  );
}
