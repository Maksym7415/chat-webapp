/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import axios, { AxiosResponse } from 'axios';
import './styles/styles.scss';

interface Users {
  firstName: string
}

interface Info {
  conversationName?: string
  Users: Array<Users>
}

function ChatInfo() {
  const [data, setData] = useState<Info>({ Users: [] });

  useEffect(() => {
    (async () => {
      const d: AxiosResponse = await axios.get('http://localhost:8081/api/getConversation/11?type=Chat');
      return setData(d.data);
    })();
  }, []);

  return (
        <div className='chat_info'>
          <div className='chat_info-container'>
            <div className='chat_info-header'>
              <Typography variant='h5' align='center'>
                Chat Info
              </Typography>
            </div>
            <div className='chat_info-body'>
              <div className='chat_info-body-name'>
                <p>{data.conversationName}</p>
              </div>
              <div className='chat_info-body-userscontainer'>
                <div className='userscontainer-title'>
                  <Typography variant='body1' align='center'>
                    User list
                  </Typography>
                </div>
                <div className='userscontainer-users'>
                  {data.Users.map(({ firstName }) => <p>{firstName}</p>)}
                </div>
              </div>
            </div>

          </div>

        </div>
  );
}

export default ChatInfo;
