import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { UserConversationsSuccess } from '../../redux/pages/conversations/constants/interfaces';

export default ({ data }: UserConversationsSuccess) => (
    <Grid item xs={3} >
        {data.map((element) => (
            <div key={element.messageId} style={{
              display: 'flex', borderBottom: '1px solid grey', padding: '5px', alignItems: 'center',
            }} >
                <Avatar style={{ width: '70px', height: '70px' }}/>
                <div style={{
                  width: '250px', display: 'flex', flexDirection: 'column', marginLeft: '10px',
                }}>
                    <Typography variant='h5'>Sender Name</Typography>
                    <Typography style={{
                      width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }} component="p">{element.message}</Typography>
                </div>
                {/* <Skeleton /> */}
            </div>
        ))}
    </Grid>
);
