import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogContent, DialogTitle, DialogActions, TextField, Paper, IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { DialogProps, FilesSrc, Files } from '../../../interfaces';
import useStyles from '../styles/styles';
import { preloaderAction } from '../../../../../redux/common/commonActions';

export default function UploadDialog({
  handleClose, handleSend, isOpen, files, handleAddFile, message, src, setSrc, setMessage, setFiles,
}: DialogProps) {
  // HOOKS
  const classes = useStyles();
  const dispatch = useDispatch();

  // FUNCTIONS
  const readImage = (file: File, name: string) => {
    const reader: FileReader = new FileReader();
    reader.onload = (event: Event) => {
      setSrc((prev: FilesSrc) => ({ ...prev, [name]: { file: reader.result, type: 'image' } }));
    };
    reader.readAsDataURL(file);
  };

  const handleSendFiles = () => {
    if (files && Object.keys(files).length < 1) return;
    dispatch(preloaderAction(true));
    handleSend(message);
  };

  const handleCloseDialog = () => {
    handleClose(false);
    setSrc({});
  };

  const sendMessageByKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSendFiles();
  };

  const handleRemoveFile = (indexFile: string) => {
    let newFiles:Files = { ...files };
    let newSrc:FilesSrc = { ...src };

    delete newFiles[indexFile];
    delete newSrc[indexFile];

    setFiles(newFiles);
    setSrc(newSrc);
  };

  // USEEFFECTS
  useEffect(() => {
    if (files) {
      Object.keys(files).forEach((key: string) => {
        if (files[key].type.includes('image')) return readImage(files[key], key);
        setSrc((prev: FilesSrc) => ({ ...prev, [key]: { file: files[key].name, type: 'file' } }));
      });
    }
  }, [files]);

  const deleteElement = (hash: string, style?: React.CSSProperties): any => <div className={classes.deleteFileWrapper} style={style}>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          // component="span"
                          className={classes.deleteFile}
                          onClick={() => handleRemoveFile(hash)}

                        >
                          <DeleteIcon />
                        </IconButton>
                    </div>;
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
            Object.entries(src).map((item: any) => {
              const hash = item[0];
              const file = item[1];
              return (file.type === 'image'
                ? <div className={classes.wrapperFile} key={hash}>
                        <img className='conversations__upload-image' src={file.file} />
                        {deleteElement(hash)}
                  </div>
                : <Paper
                      className={classes.paperFileContainerDialog}
                      key={hash}
                    >
                      <InsertDriveFileIcon/>
                      <p>{file.file}</p>
                      {deleteElement(hash, { right: '-10px' })}
                    </Paper>);
            })
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
