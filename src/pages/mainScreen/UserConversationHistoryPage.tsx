import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { conversationUserHistoryActionRequest } from '../../redux/pages/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const messageHistory = useSelector(({ userConversationHistoryReducer }: RootState) => userConversationHistoryReducer.userHistoryConversation.success.data);
  console.log(messageHistory);
  useEffect(() => {
    dispatch(conversationUserHistoryActionRequest(1));
  }, [dispatch]);

  return (
       <Grid item xs={7}>
         {messageHistory.map(({ fkSenderId, message, sendDate }) => (
             <div>
               <p>{message}</p>
               <p>{fkSenderId}</p>
               <p>{sendDate}</p>
             </div>
         ))}
       </Grid>
  );
}
