/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-param-reassign */
import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { RootState } from '../../../../redux/reducer';
import { handleGetBufferFile, handleEmitFilePartly } from '../../helpers/addFiles';
import UploadDialog from './uploadDialog';

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

export default function AddFiles() {
  const classes = useStyles();
  const { userId } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.currentChat.id);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const handleOpenDialog = (isOpen: boolean) => {
    if (!isOpen) setFiles(null);
    setIsOpenDialog(isOpen);
  };

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

  // const handleDeleteFile = (key: string) => {
  //   const result: DynamicFilesObjectKeys | null = { ...files };
  //   delete result[key];
  //   if (Object.keys(result).length > 0) return setFiles(result);
  //   setFiles(null);
  // };

  // const readImage = (file: File, index: number) => {
  //   // Check if the file is an image.
  //   // if (file.type && file.type.indexOf('image') === -1) {
  //   //   let src = '';
  //   //   if (file.type.indexOf('pdf')) src = icons.pdf;
  //   //   if (file.type.indexOf('vnd')) {
  //   //     const type = file.type.split('.');
  //   //     if (type[type.length - 1] === 'document') src = icons.doc;
  //   //     if (type[type.length - 1] === 'sheet') src = icons.xls;
  //   //   }
  //   //   if (src === '') src = icons.unknown;
  //   //   const key: string = uuidv4();
  //   //   return setFiles((prev) => ({ ...prev, [key]: { file, src } }));
  //   // }
  //   const reader = new FileReader();
  //   reader.addEventListener('load', (event) => {
  //     // setFiles((prev) => ({ ...prev, [uuidv4()]: { file, src: event.target.result } }));
  //   });
  //   reader.readAsDataURL(file);
  // };

  // const handleFilesObject = (files: FileList | null) => {
  //   if (!files) return;
  //   const result: DynamicFilesObjectKeys = {};
  //   Object.values(files).forEach((file: File, i: any) => {
  //     // result[i] = { file };
  //     readImage(file, i);
  //   });
  // };

  const stopEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
    const file: FileList | null = (event.target as HTMLInputElement).files;
    // handleFilesObject(file);
  };

  // const openFileDialog = () => {
  //   const input = fileInputRef.current;
  //   if (input) input.click();
  // };

  const onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    handleOpenDialog(true);
    const file: FileList | null = event.target.files;
    setFiles(file);
    // handleFilesObject(file);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
      <UploadDialog handleSend={handleSendFiles} isOpen={isOpenDialog} handleClose={handleOpenDialog} />
    </>
  );
}
