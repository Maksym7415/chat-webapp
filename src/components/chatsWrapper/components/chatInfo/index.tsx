/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { RootState } from '../../../../redux/reducer/index';
import { showDialogAction, showChatInfoPanel } from '../../../../redux/common/commonActions';
import { conversationInfoAction } from '../../../../redux/conversations/constants/actionConstants';
import './styles/styles.scss';

interface ParamsId {
  id: string
}

interface Users {
  firstName: string
}

interface Info {
  conversationName?: string
  Users: Array<Users>
}

function ChatInfo() {
  const dispatch = useDispatch();
  const currentConversationId = +useParams<ParamsId>().id;
  const data = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationInfo.success);

  const userProfile = (id:number) => {
    dispatch(showDialogAction('Profile', id));
  };

  const handleShowChatInfoPanel = () => dispatch(showChatInfoPanel(false));

  useEffect(() => {
    dispatch(conversationInfoAction(currentConversationId, 'Chat'));
  }, [currentConversationId]);

  return (
      <>
        {!isNaN(currentConversationId) && <div className='chat_info'>
          <div className='chat_info-container'>
            <div className='chat_info-header'>
              <Typography variant='h5' align='center'>
                Chat Info
              </Typography>
              <IconButton aria-label="info" color="inherit" onClick={handleShowChatInfoPanel}>
                  <CloseIcon onClick={handleShowChatInfoPanel} />
              </IconButton>
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
                  {data.Users?.map(({ firstName, id }, key) => <p onClick={() => userProfile(id)} key={key}>{firstName}</p>)}
                </div>
              </div>
            </div>
          </div>
        </div>}
      </>
  );
}

export default ChatInfo;
