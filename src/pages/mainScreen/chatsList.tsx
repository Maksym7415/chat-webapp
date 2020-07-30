import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { UserConversationsSuccess } from '../../redux/pages/conversations/constants/interfaces';
import { conversationUserHistoryActionRequest } from '../../redux/pages/conversations/constants/actionConstants';

export default ({ data }: UserConversationsSuccess) => {
  const dispatch = useDispatch();

  const handleChangeChat = (id: number) => dispatch(conversationUserHistoryActionRequest(id));

  return (
        <Grid item xs={3} >
            {data.map((element) => (
                <div className='flex chat__chats-item' key={element.conversationId} onClick={() => handleChangeChat(element.conversationId)} >
                    <Avatar style={{ width: '70px', height: '70px' }}/>
                    <div className='chat__chats-item-message-conteiner'>
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
};
