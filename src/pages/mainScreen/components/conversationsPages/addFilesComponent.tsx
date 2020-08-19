/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React, { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { RootState } from '../../../../redux/reducer';
import { handleGetBufferFile, handleEmitFilePartly } from '../../helpers/addFiles';
import UploadDialog from './uploadDialog';
import { AddFilesProps } from './interfaces';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

let filesCount = 0;

export interface DynamicFilesObjectKeys {
  [key: string]: {
    file: File
    src: string
  }
}

export default function AddFiles({ files, isOpen, handleOpenDialog }: AddFilesProps) {
  const classes = useStyles();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);

  const handleSendFiles = () => {
    // const { files } = event.target;
    if (!files) return;

    let fileReader = new FileReader();
    if (files) {
      let filesArray = Object.values(files);
      const handleEmitFile = async () => {
        if (filesCount === filesArray.length) {
          filesCount = 0;
        } else {
          const file = await handleGetBufferFile(fileReader, filesArray[filesCount]);
          handleEmitFilePartly(file, filesArray[filesCount].size, filesArray[filesCount].name, userId, conversationId, socket);
          filesCount++;
          handleEmitFile();
        }
      };
      handleEmitFile();
    }
  };

  console.log(files, isOpen);

  return (
    <>
      <UploadDialog handleSend={handleSendFiles} isOpen={isOpen} handleClose={handleOpenDialog} files={files} />
    </>
  );
}
