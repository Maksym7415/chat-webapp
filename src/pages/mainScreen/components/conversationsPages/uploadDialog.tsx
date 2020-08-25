import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DialogProps } from './interfaces';
import useStyles from './styles/styles';

import Preloader from '../../../../components/preloader/Preloader';

export default function UploadDialog({
  handleClose, handleSend, isOpen, files, handleAddFile,
}: DialogProps) {
  const classes = useStyles();
  const [message, setMessage] = useState<string>('');
  const [src, setSrc] = useState<Array<string | ArrayBuffer | null>>([]);

  const readImage = (file: File) => {
    const reader: FileReader = new FileReader();
    reader.onload = (event: Event) => {
      setSrc((prev) => ([...prev, reader.result]));
    };
    reader.readAsDataURL(file);
  };

  const handleCloseDialog = () => {
    handleClose(false);
    setSrc([]);
  };

  useEffect(() => {
    if (files) Object.values(files).forEach((file) => readImage(file));
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
        <div className='conversations__upload-image-container relative'>
          <div className='conversations__loader-dialog'>
            <Preloader/>
          </div>

          {
            src.map((file: any) => <img key={file} className='conversations__upload-image' src={file} />)
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
            <Button variant='contained' color='primary' onClick={() => handleSend(message)}>Send</Button>
            <Button classes={{ root: classes.buttonMargin }} variant='contained' color='primary' onClick={handleCloseDialog}>Close</Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}
