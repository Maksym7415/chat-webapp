import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { conversationUserHistoryActionRequest } from '../../redux/pages/conversations/constants/actionConstants';

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(conversationUserHistoryActionRequest(1));
  }, [dispatch]);

  return (
      <>
      </>
  );
}
