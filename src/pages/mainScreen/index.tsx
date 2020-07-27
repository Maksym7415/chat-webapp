import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import OverviewPartSkeleton from './OverviewPartSkeleton';
import ChatWindowSkeleton from './ChatWindowSkeleton';
import { actionLogout } from '../../redux/pages/authorization/constants/actionConstatns';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    display: 'flex',
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
    <div className={classes.skeleton}>
      <button onClick={async () => {
        dispatch(actionLogout());
        return push('/verification');
      }}>Выход</button>
      <OverviewPartSkeleton />
      <ChatWindowSkeleton />
    </div>
  );
}
