import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, TextField,
} from '@material-ui/core';
import { DialogProps } from './interfaces';
import useStyles from './styles/styles';
import { preloaderAction } from '../../../../redux/common/commonActions';

export default function UploadDialog({
  handleClose, handleSend, isOpen, files, handleAddFile, message, src, setSrc, setMessage,
}: DialogProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const readImage = (file: File, name: string) => {
    const reader: FileReader = new FileReader();
    reader.onload = (event: Event) => {
      setSrc((prev: any) => ({ ...prev, [name]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSendFiles = () => {
    dispatch(preloaderAction(true));
    handleSend(message);
  };

  const handleCloseDialog = () => {
    handleClose(false);
    setSrc({});
  };

  useEffect(() => {
    if (files) {
      Object.keys(files).forEach((key: string) => readImage(files[key], key));
    }
  }, [files]);

  return (
    <Dialog
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      maxWidth='xs'
    >
      <DialogTitle>
        Add files
      </DialogTitle>
      <DialogContent dividers>
        <div className='conversations__upload-image-container'>
          {
            Object.values(src).map((file: any, i) => <img key={i} className='conversations__upload-image' src={file} />)
          }
        </div>
        <TextField
          label='Caption'
          fullWidth
          value={message}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            event.persist();
            setMessage(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsContainer }}>
        <Button variant='contained' color='primary' onClick={() => handleAddFile()}>Add</Button>
        <div className='full-w flex'>
          <div className='conversations__send-close-buttons-container'>
            <Button variant='contained' color='primary' onClick={handleSendFiles}>Send</Button>
            <Button classes={{ root: classes.buttonMargin }} variant='contained' color='primary' onClick={handleCloseDialog}>Close</Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
