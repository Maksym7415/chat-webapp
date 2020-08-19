import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogContent, DialogTitle, DialogActions,
} from '@material-ui/core';
import { DialogProps } from './interfaces';
import useStyles from './styles';

export default function UploadDialog({
  handleClose, handleSend, isOpen, files,
}: DialogProps) {
  const classes = useStyles();

  return (
  // <div>
      <Dialog
        // classes={{ root: classes.container }}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        maxWidth='xs'
      >
        <DialogTitle>
          Add files
        </DialogTitle>
        <DialogContent dividers>
          Content
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='primary' onClick={() => handleSend()}>Send</Button>
          <Button variant='outlined' color='primary' onClick={() => handleClose(false)}>Close</Button>
        </DialogActions>
      </Dialog>
  // </div>
  );
}
