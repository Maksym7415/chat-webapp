/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { fullDate } from '../../../common/getCorrectDateFormat';
import { socket } from '../../../socket';
import { RootState } from '../../../redux/reducer';
import { handleGetBufferFile } from '../../mainScreen/helpers/addFiles';
import UploadDialog from './uploadDialog';
import { AddFilesProps, FilesSrc } from '../../mainScreen/interfaces';

let filesCount = 0;

export default function AddFiles({
  files, isOpen, handleOpenDialog, handleAddFile,
}: AddFilesProps) {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const [message, setMessage] = useState<string>('');
  const [src, setSrc] = useState<FilesSrc | object>({});

  const handleSendFiles = (message: string) => {
    if (!files) return;

    let fileReader = new FileReader();
    if (files) {
      let filesArray = Object.values(files);
      const handleEmitFile = async (messageId: number, sendDate: any) => {
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
          isEditing: false,
        },
      }, (id: number) => {
        if (id) handleEmitFile(id, fullDate(new Date()));
      });
    }
  };

  return (
    <>
      <UploadDialog handleSend={handleSendFiles} isOpen={isOpen} handleClose={handleOpenDialog} files={files} handleAddFile={handleAddFile} message={message} src={src} setSrc={setSrc} setMessage={setMessage} />
    </>
  );
}
