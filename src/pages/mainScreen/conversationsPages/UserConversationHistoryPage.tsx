import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { conversationUserHistoryActionRequest } from '../../../redux/pages/conversations/constants/actionConstants';
import { RootState } from '../../../redux/reducer';
import getCorrectDate from '../../../common/getCorrectDateFormat';

const useStyles = makeStyles((theme) => ({
  messagesDiv: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '80%',
    margin: '0 auto',
    marginBottom: '25px',
  },
  paperSenderMessage: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  paperFriendMessage: {
    background: 'linear-gradient(90deg, rgba(246,120,18,1) 35%, rgba(252,61,23,1) 69%)',
  },
  dateSender: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    color: '#e8e8e8',
  },
  messageText: {
    maxWidth: '80%',
    color: '#e8e8e8',
  },
}));

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const messageHistory = useSelector(({ userConversationHistoryReducer }: RootState) => userConversationHistoryReducer.userHistoryConversation.success.data);

  useEffect(() => {
    dispatch(conversationUserHistoryActionRequest(1));
  }, [dispatch]);

  return (
    <Grid item xs={6}>
      {messageHistory.map(({ fkSenderId, message, sendDate }, index) => (
        <div className={classes.messagesDiv} key={index}>
          <Paper elevation={1} className={clsx(classes.paperSenderMessage, {
            [classes.paperFriendMessage]: fkSenderId !== 1,
          })}>
            <p className={classes.messageText}>{message}</p>
            <p className={classes.dateSender}>{getCorrectDate(new Date(sendDate))}</p>
          </Paper>
        </div>
      ))}
    </Grid>
  );
}
