import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { conversationUserHistoryActionRequest } from '../../../redux/pages/conversations/constants/actionConstants';
import { RootState } from '../../../redux/reducer';
import getCorrectDate from '../../../common/getCorrectDateFormat';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  messagesDiv: {
    display: 'flex',
    justify-content: 'space-evenly'
  },
}));



export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles()
  const messageHistory = useSelector(({ userConversationHistoryReducer }: RootState) => userConversationHistoryReducer.userHistoryConversation.success.data);
  useEffect(() => {
    dispatch(conversationUserHistoryActionRequest(1));
  }, [dispatch]);

  return (
       <Grid item xs={6}>
         {messageHistory.map(({ fkSenderId, message, sendDate }) => (
             <div className={classes.messagesDiv}>
               <p>{message}</p>
               <p>{fkSenderId}</p>
               <p>{getCorrectDate(new Date(sendDate))}</p>
             </div>
         ))}
       </Grid>
  );
}
