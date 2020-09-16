import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { hideDialogAction } from '../../redux/common/commonActions';

export default function DialogComponent() {
  const dispatch = useDispatch();
  const dialogState = useSelector(({ commonReducer }: RootState) => commonReducer.dialogComponent);

  const handleClose = () => dispatch(hideDialogAction());

  return (
    <Dialog onClose={handleClose} open={dialogState.isShow}>
      <DialogTitle id="customized-dialog-title">
          {dialogState.title}
      </DialogTitle>
      <DialogContent dividers>
        hello
      </DialogContent>
    </Dialog>
  );
}
