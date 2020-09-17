import React, { useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { hideDialogAction } from '../../redux/common/commonActions';
import UserProfile from '../../pages/user/components/userProfile';
import NewChat from '../newChatScreen';
import useStyles from './styles/styles';

export default function DialogComponent() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const dialogState = useSelector(({ commonReducer }: RootState) => commonReducer.dialogComponent);

  const handleClose = () => dispatch(hideDialogAction());

  const Content = () => {
    switch (dialogState.title) {
      case 'Profile':
        return <UserProfile />;
      case 'Add New Chat':
        return <NewChat />;
      default:
        return null;
    }
  };

  return (
    <Dialog onClose={handleClose} open={dialogState.isShow}>
      <DialogTitle disableTypography className={classes.titleContainer}>
        <Typography variant='subtitle1' className={classes.title}>{dialogState.title}</Typography>
        <IconButton
          className={classes.closeIconButton}
          onClick={handleClose}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ width: '400px', padding: '10px 0' }} dividers>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
