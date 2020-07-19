import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OverviewPartSkeleton from './OverviewPartSkeleton';
import ChatWindowSkeleton from './ChatWindowSkeleton';

const useStyles = makeStyles((theme) => ({
  skeleton: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <div className={classes.skeleton}>
      <OverviewPartSkeleton />
      <ChatWindowSkeleton />
    </div>
  );
}
