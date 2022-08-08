/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Typography, TextField, Avatar,
} from '@material-ui/core';
import { hideDialogAction, shareMessageAction } from '../../../redux/common/commonActions';
import DefaultAvatar from '../../defaultAvatar';
import { Paths } from '../../../routing/config/paths';
import useStyles from './styles/styles';
import { ShareMessageProps } from './interfaces';
import languages from '../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// rework ts

export default function ShareMessage({ data }: ShareMessageProps) {
  // HOOKS
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const conversationsList = useAppSelector(({ userConversationReducer }) => userConversationReducer.conversationsList.success.data);

  // STATES
  const [searchNameChat, setSearchNameChat] = useState<string>('');

  // VARIABLES
  const conversationsFiltred = conversationsList.filter((conversation) => conversation.conversationName.includes(searchNameChat));

  // FUNCTIONS
  const handleChatNameHandler = (event: any) => {
    setSearchNameChat(event.target.value);
  };

  const handleShareMessageId = (conversationId: number) => {
    dispatch(shareMessageAction(data));
    history.push({
      pathname: `${Paths.chat}/${conversationId}`,
      state: {
        from: 'shareMessage',
      },
    });
    dispatch(hideDialogAction());
  };

  return (
        <div className={classes.container}>
            <TextField
              id="name"
              variant="outlined"
              size="small"
              placeholder={`${languages[lang].generals.shareMessageWith}...`}
              className={classes.inputFilter}
              onChange={handleChatNameHandler}
            />
          <div className={classes.wrapperConversation} >
            {conversationsFiltred.length
              ? conversationsFiltred.map((element) => (
                <div
                  onClick={() => handleShareMessageId(element.conversationId)}
                  className={classes.conversation}
                  key={element.conversationId}
                >
                  {element.conversationAvatar ? <Avatar className={classes.avatar} src={`${process.env.REACT_APP_BASE_URL}/${element.conversationAvatar}`} /> : <DefaultAvatar name={element.conversationName} width='50px' height='50px' fontSize='1.1rem' />}
                  <div className='flex chat__chats-item-message-container relative'>
                      <Typography className={classes.bold} variant='subtitle1'>{element.conversationName}</Typography>
                      <Typography variant='caption' className={classes.messageText}>
                        {element.conversationType}
                      </Typography>
                  </div>
                </div>))
              : <p className={classes.noUsersFound}>{languages[lang].generals.noUsersFound}.</p>}
          </div>
        </div>

  );
}
