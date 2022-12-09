import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NewChat from "../newChat/newChatScreen";
import ShareMessage from "../popups/shareMessage";
import useStyles from "./styles/styles";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

export default function DialogComponent() {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // // SELECTORS
  // const dialogState = useAppSelector(({ commonReducer }) => commonReducer.dialogComponent);

  // // HOOKS
  // const handleClose = () => dispatch(hideDialogAction());

  // const Content = () => {
  //   switch (dialogState.title) {
  //     case 'Profile':
  //       return <UserProfile />;
  //     case 'Add New Chat':
  //       return <NewChat />;
  //     case 'Share Message':
  //       return <ShareMessage data={dialogState.data}/>;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <></>
    // <Dialog onClose={handleClose} open={dialogState.isShow} PaperProps={{
    //   style: {
    //     overflow: 'unset',
    //   },
    // }}
    // >
    //   <DialogTitle disableTypography className={classes.titleContainer}>
    //     <Typography variant='subtitle1' className={classes.title}>{dialogState.title}</Typography>
    //     <IconButton
    //       className={classes.closeIconButton}
    //       onClick={handleClose}
    //     >
    //       <CloseIcon className={classes.closeIcon} />
    //     </IconButton>
    //   </DialogTitle>
    //   <DialogContent className={classes.dialogContent}>
    //     <Content />
    //   </DialogContent>
    // </Dialog>
  );
}
