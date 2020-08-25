/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import socket from '../../../../socket';
import { RootState } from '../../../../redux/reducer';
import { handleGetBufferFile, handleEmitFilePartly } from '../../helpers/addFiles';
import UploadDialog from './uploadDialog';
import { AddFilesProps } from './interfaces';

let filesCount = 0;

export default function AddFiles({
  files, isOpen, handleOpenDialog, handleAddFile,
}: AddFilesProps) {
  const dispatch = useDispatch();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const [message, setMessage] = useState<string>('');
  const [src, setSrc] = useState<Array<string | ArrayBuffer | null>>([]);

  const handleSendFiles = (message: string) => {
    if (!files) return;

    let fileReader = new FileReader();
    if (files) {
      let filesArray = Object.values(files);
      const handleEmitFile = async () => {
        if (filesCount === filesArray.length) {
          filesCount = 0;
        } else {
          const file = await handleGetBufferFile(fileReader, filesArray[filesCount]);
          handleEmitFilePartly(file, filesArray[filesCount].size, filesArray[filesCount].name, userId, conversationId, socket, message, filesArray[filesCount].type, filesArray.length, dispatch, handleOpenDialog, setSrc, setMessage);
          filesCount++;
          handleEmitFile();
        }
      };
      handleEmitFile();
    }
  };

  return (
    <>
      <UploadDialog handleSend={handleSendFiles} isOpen={isOpen} handleClose={handleOpenDialog} files={files} handleAddFile={handleAddFile} message={message} src={src} setSrc={setSrc} setMessage={setMessage} />
    </>
  );
}
