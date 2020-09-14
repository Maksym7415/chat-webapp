/* eslint-disable @typescript-eslint/indent */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper,
} from '@material-ui/core';
import {
  conversationUserHistoryActionRequest,
  createNewChatAction,
  getConversationIdAction,
  clearConversationData,
} from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import AddFiles from './components/addFilesComponent';
import './styles/styles.scss';
import {
  Files, CurrentConversationMessages, ScrollValue, MessageValue, Pagination,
} from './interfaces';
import { checkIsShowAvatar, scrollTop, settingFilesObject } from '../../helpers/userHistoryConversations';

const getCurrentScrollTop = (element: any) => element.scrollTop;

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const isCreateChat = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.createConversation.success.data);
  const opponentId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.opponentId.id);
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});

  const [scrollValue, setScrollValue] = useState<ScrollValue>({});

  const [files, setFiles] = useState<Files>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);

  const ref = useRef(null);

  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (allMessages[conversationId]?.length % 15 === 0 && element.scrollTop === 0) {
      dispatch(conversationUserHistoryActionRequest(conversationId, localPagination[conversationId] + 15));
    }
  };

  const handleOpenDialog = (isOpen: boolean) => {
    if (!isOpen) {
      setFiles({});
    }
    setIsOpenDialog(isOpen);
  };

  const openFileDialog = () => {
    const element = inputRef.current;
    if (element) element.click();
  };

  const stopEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    stopEvent(event);
    handleOpenDialog(true);
    const file: FileList | null = (event.target as HTMLInputElement).files;
    settingFilesObject(file, setFiles);
  };

  const onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const file: FileList | null = event.target.files;
    if (file && !file.length) return;
    handleOpenDialog(true);
    settingFilesObject(file, setFiles);
    setIsInputState(true);
    // event.target.value = '';
  };

  useEffect(() => () => {
    dispatch(clearConversationData());
  }, []);

  useEffect(() => {
    setIsInputState(false);
  }, [files]);

  useEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
      dispatch(conversationUserHistoryActionRequest(conversationId, 0));
    }
    return () => {
      if (!conversationId) {
        dispatch(createNewChatAction({ userId: 0, opponentId: 0 }));
      }
    };
  }, [conversationId]);

  useEffect(() => {
    scrollTop(ref);
    setLocalPagination((value) => ({ ...value, [conversationId]: pagination.currentPage }));
    setAllMessages((messages) => ({ ...messages, [conversationId]: [...messageHistory, ...(messages[conversationId] === undefined ? [] : messages[conversationId])], 0: [] }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && conversationId in lastMessage) setAllMessages((messages) => ({ ...messages, [conversationId]: [...messages[conversationId], lastMessage[conversationId]] }));
  }, [lastMessage]);

  useEffect(() => {
    if (opponentId) {
      dispatch(getConversationIdAction(0));
      if (isCreateChat.length) {
        dispatch(getConversationIdAction(isCreateChat[0].id));
      }
    }
  }, [isCreateChat]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className='conversations__container'
      onScroll={scrollHandler}
      id = 'messages'
    >
      <Grid item xs={12} >
        <>
          {Object.keys(allMessages).length === 1 && !opponentId ? <p>Выберите чат</p> : conversationId === 0 ? <p> Отправьте новое соообщение, чтобы создать чат</p>
            : allMessages[conversationId] && allMessages[conversationId].length === 0 ? <p> В этом чате еще нет соообщений</p> : allMessages[conversationId] && allMessages[conversationId].map(({
            fkSenderId, message, id, sendDate, User, Files,
          }, index: number) => {
            let isShowAvatar = false;
            if (fkSenderId !== userId && checkIsShowAvatar(allMessages[conversationId], fkSenderId, userId, index)) isShowAvatar = true;
            return (
              <Message
                key={id}
                isShowAvatar={isShowAvatar}
                fkSenderId={fkSenderId}
                message={message}
                id={id}
                sendDate={sendDate}
                User={User}
                Files={Files}
                userId={userId}
              />
            );
          })}
          <div style={{ height: '50px' }} ref={ref}></div>
        </>
      </Grid>
      {(!!conversationId || !!opponentId) && (
        <MessageInput
          conversationId={conversationId}
          userId={userId}
          firstName={firstName}
          opponentId={opponentId}
          openFileDialog={openFileDialog}
        />
      )}
      {!isInputState && <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        multiple
        onChange={onFilesAdded}
      />}
      <AddFiles files={files} isOpen={isOpenDialog} handleOpenDialog={handleOpenDialog} handleAddFile={openFileDialog} />
    </div>
  );
}
