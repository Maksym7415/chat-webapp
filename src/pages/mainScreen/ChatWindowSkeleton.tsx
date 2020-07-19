import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

export default () => (
  <div style={{ width: '60%' }}>
    {[1, 2, 3].map((element) => <Typography component="div" key={element} variant={'h1'} >
      <Skeleton style={{ height: '150px' }} />
    </Typography>)}
  </div>
);
