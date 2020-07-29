import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid } from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import OverviewPartSkeleton from './OverviewPartSkeleton';
import ChatWindowSkeleton from './ChatWindowSkeleton';
import UserConversationHistoryPage from './conversationsPages/UserConversationHistoryPage';
import { actionLogout } from '../../redux/pages/authorization/constants/actionConstatns';
import ConversationProfile from './conversationsPages/ConversationProfile';

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

  return (
    <Grid container item xs={12} justify="space-between">
      {/* <button onClick={async () => {
        dispatch(actionLogout());
        return push('/verification');
      }}>Выход</button> */}
      <OverviewPartSkeleton />
      {/* <ChatWindowSkeleton /> */}
      <UserConversationHistoryPage/>
      <ConversationProfile/>
    </Grid>
  );
}
