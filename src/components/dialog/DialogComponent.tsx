import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducer';
import { hideDialogAction } from '../../redux/common/commonActions';
import UserProfile from '../../pages/user/components/userProfile';
import NewChat from '../newChat/newChatScreen';
import ShareMessage from '../popups/shareMessage';
import useStyles from './styles/styles';

export default function DialogComponent() {
  // HOOKS
  const dispatch = useDispatch();
  const classes = useStyles();

  // SELECTORS
  const dialogState = useSelector(({ commonReducer }: RootState) => commonReducer.dialogComponent);

  // HOOKS
  const handleClose = () => dispatch(hideDialogAction());

  const Content = () => {
    switch (dialogState.title) {
      case 'Profile':
        return <UserProfile />;
      case 'Add New Chat':
        return <NewChat />;
      case 'Share Message':
        return <ShareMessage data={dialogState.data}/>;
      default:
        return null;
    }
  };

  return (
    <Dialog onClose={handleClose} open={dialogState.isShow} PaperProps={{
      style: {
        overflow: 'unset',
      },
    }}
    >
      <DialogTitle disableTypography className={classes.titleContainer}>
        <Typography variant='subtitle1' className={classes.title}>{dialogState.title}</Typography>
        <IconButton
          className={classes.closeIconButton}
          onClick={handleClose}
        >
          <CloseIcon className={classes.closeIcon} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Content />
      </DialogContent>
    </Dialog>
  );
}
