import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  Dialog, DialogContent, DialogTitle, DialogActions,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { DialogProps } from './interfaces';

export default function UploadDialog({ handleClose, handleSend, isOpen }: DialogProps) {
  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
        <DialogTitle>
          Add files
        </DialogTitle>
        <DialogContent dividers>
          Content
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSend()}>Send</Button>
          <Button onClick={() => handleClose(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
