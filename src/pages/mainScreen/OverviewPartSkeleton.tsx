import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography, Grid } from '@material-ui/core';

export default () => (
    <Grid item xs={3} >
        {[1, 2, 3, 4, 5].map((element) => <Typography component="div" key={element} variant={'h1'} >
            <Skeleton />
        </Typography>)}
    </Grid>
);
