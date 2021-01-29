import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, TextField, Paper,
} from '@material-ui/core';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { DialogProps, FilesSrc } from '../interfaces';
import useStyles from '../styles/styles';
import { preloaderAction, setMessageFilesAction } from '../../../redux/common/commonActions';

function UploadDialog({
  handleClose, isOpen, files, handleAddFile, src, setSrc, message, setMessage,
}: DialogProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const readImage = (file: File, name: string) => {
    const reader: FileReader = new FileReader();
    reader.onload = (event: Event) => {
      setSrc((prev: FilesSrc) => ({ ...prev, [name]: { file: reader.result, type: 'image' } }));
    };
    reader.readAsDataURL(file);
  };

  const handleSendFiles = async () => {
    dispatch(preloaderAction(true));
    const formData = new FormData();
    if (!files) return;
    Object.values(files).forEach((el) => formData.append('file', el));
    try {
      const filesNames = await axios('/upload-message-files', {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
      dispatch(setMessageFilesAction(filesNames.data));
      dispatch(preloaderAction(false));
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessageByKey = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') await handleSendFiles();
  };

  useEffect(() => {
    if (files) {
      Object.keys(files).forEach((key: string) => {
        if (files[key].type.includes('image')) return readImage(files[key], key);
        setSrc((prev: FilesSrc) => ({ ...prev, [key]: { file: files[key].name, type: 'file' } }));
      });
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
            Object.values(src).map((file: any, i) => (
              file.type === 'image'
                ? <img key={i} className='conversations__upload-image' src={file.file} />
                : <Paper
                    className={classes.paperFileContainerDialog}
                    key={i}
                  >
                    <InsertDriveFileIcon/>
                    <p>{file.file}</p>
                  </Paper>
            ))
          }
        </div>
        <TextField
          label='Caption'
          fullWidth
          value={message}
          onKeyDown={sendMessageByKey}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            event.persist();
            setMessage(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsContainer }}>
        <Button variant='contained' color='primary' onClick={handleAddFile}>Add</Button>
        <div className='full-w flex'>
          <div className='conversations__send-close-buttons-container'>
            <Button variant='contained' color='primary' onClick={handleSendFiles}>Send</Button>
            <Button classes={{ root: classes.buttonMargin }} variant='contained' color='primary' onClick={() => handleClose(false)}>Close</Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default UploadDialog;
