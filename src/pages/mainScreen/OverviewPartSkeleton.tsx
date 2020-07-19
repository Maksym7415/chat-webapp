import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

export default () => (
    <div style={{ width: '30%' }}>
        {[1, 2, 3, 4, 5].map((element) => <Typography component="div" key={element} variant={'h1'} >
            <Skeleton />
        </Typography>)}
    </div>
);
