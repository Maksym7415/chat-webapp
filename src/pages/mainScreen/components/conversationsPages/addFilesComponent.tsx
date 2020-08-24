/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { RootState } from '../../../../redux/reducer';
import { handleGetBufferFile, handleEmitFilePartly } from '../../helpers/addFiles';
import UploadDialog from './uploadDialog';
import { AddFilesProps } from './interfaces';
import useStyles from './styles/styles';

let filesCount = 0;

export default function AddFiles({
  files, isOpen, handleOpenDialog, handleAddFile,
}: AddFilesProps) {
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);

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
          handleEmitFilePartly(file, filesArray[filesCount].size, filesArray[filesCount].name, userId, conversationId, socket, message, filesArray[filesCount].type);
          filesCount++;
          handleEmitFile();
        }
      };
      handleEmitFile();
    }
  };

  return (
    <>
      <UploadDialog handleSend={handleSendFiles} isOpen={isOpen} handleClose={handleOpenDialog} files={files} handleAddFile={handleAddFile} />
    </>
  );
}
