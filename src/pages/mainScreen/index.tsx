import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import ChatsList from './chatsList';
import ChatWindowSkeleton from './ChatWindowSkeleton';
import UserConversationHistoryPage from './conversationsPages/UserConversationHistoryPage';
import ConversationProfile from './conversationsPages/ConversationProfile';
import { getUserConversationsActionRequest } from '../../redux/pages/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import './styles/index.scss';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    // display: 'flex',
    justifyContent: 'space-between',
  },
}));

interface IProps {
  history: {
    push: (url: string) => void
  }
}

export default function BasicTextFields({ history: { push } }: IProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversationsList = useSelector(({ userConversationHistoryReducer }: RootState) => userConversationHistoryReducer.conversationsList.success.data);

  useEffect(() => {
    dispatch(getUserConversationsActionRequest());
  }, []);

  console.log(conversationsList);

  return (
    <Grid container item xs={12} justify="space-between">
      {/* <button onClick={async () => {
        dispatch(actionLogout());
        return push('/verification');
      }}>Выход</button> */}
      <ChatsList data={conversationsList} />
      {/* <ChatWindowSkeleton /> */}
      <UserConversationHistoryPage/>
      <ConversationProfile/>
    </Grid>
  );
}
