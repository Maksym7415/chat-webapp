import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { conversationUserHistoryActionRequest, createNewChatAction, getConversationIdAction } from '../../../../redux/conversations/constants/actionConstants';
import { RootState } from '../../../../redux/reducer';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import useStyles from './styles/styles';
import AddFiles from './components/addFilesComponent';
import './styles/styles.scss';
import {
  Files, CurrentConversationMessages, ScrollValue, MessageValue, Pagination,
} from './interfaces';
import { checkIsShowAvatar, scrollTop } from '../../helpers/usereHistoryConversations';

// const scrollTop = (ref: any, mainGrid: any, offset: number, position: number, isScrollTo: boolean) => {
//   if (isScrollTo) {
//     return mainGrid.scrollTo({
//       top: position + ref.current?.offsetHeight,
//       behavior: 'smooth',
//     });
//   }
//   if (position === 0 && offset !== 0) {
//     return mainGrid.scrollTo({
//       top: position || 10,
//       behavior: 'smooth',
//     });
//   }

//   ref.current?.scrollIntoView({ behavior: 'smooth' });
// };
const getCurrentScrollTop = (element: any) => element.scrollTop;

export default function UserConversationHistoryPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const isCreateChat = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.createConversation.success.data);
  const opponentId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.opponentId.id);
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const conversationId = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationId.id);
  // const typing = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.conversationTypeState);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localMessageHistory, setLocalmessageHistory] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});
  const [scrollValue, setScrollValue] = useState<ScrollValue>({});
  // const [message, setMessage] = useState<MessageValue>({ 0: '' });
  const [files, setFiles] = useState<Files>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);

  const ref = useRef(null);

  // useMemo(() => setAllMessages((prev) => {
  //   if (prev[id] && prev[id].length) {
  //     return { ...prev };
  //   }
  //   return ({ ...prev, [id]: [] });
  // }), [id]);

  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    setScrollValue((prevValue) => ({ ...prevValue, [conversationId]: getCurrentScrollTop(element) }));
    if (element.scrollTop === 0 && localMessageHistory[conversationId] && localMessageHistory[conversationId].length === 15 && allMessages[conversationId]) {
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
    if (file) {
      const result: Files = {};
      Object.values(file).forEach((element) => {
        const key = uuidv4();
        result[key] = element;
      });
      setFiles((prev) => ({ ...prev, ...result }));
    }
  };

  const onFilesAdded = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const file: FileList | null = event.target.files;
    if (file && !file.length) return;
    handleOpenDialog(true);
    if (file) {
      const result: Files = {};
      Object.values(file).forEach((element) => {
        const key = uuidv4();
        result[key] = element;
      });
      setFiles((prev) => ({ ...prev, ...result }));
    }
    setIsInputState(true);
    // event.target.value = '';
  };

  useEffect(() => {
    setIsInputState(false);
  }, [files]);

  useEffect(() => {
    // opponentId && dispatch(createNewChatAction({ userId, opponentId }));
    setAllMessages((prev) => {
      if (prev[conversationId] && prev[conversationId].length) {
        return { ...prev };
      }
      return ({ ...prev, [conversationId]: [] });
    });
    if (!allMessages[conversationId]?.length && conversationId !== 0) dispatch(conversationUserHistoryActionRequest(conversationId, 0));
  }, [conversationId]);

  useEffect(() => {
    if (!allMessages[conversationId]) return setAllMessages((prev) => ({ ...prev, [conversationId]: [...messageHistory] }));
    setAllMessages((prev) => ({
      ...prev, [conversationId]: [...messageHistory, ...prev[conversationId]],
    }));
    setLocalmessageHistory((prev) => ({ ...prev, [conversationId]: [...messageHistory] }));
    setLocalPagination((prev) => ({ ...prev, [conversationId]: pagination.currentPage }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && conversationId in lastMessage) setAllMessages((prev) => ({ ...prev, [conversationId]: [...prev[conversationId], lastMessage[conversationId]] }));
  }, [lastMessage]);

  useEffect(() => {
    let element = document.getElementById('messages');
    if (element) {
      let isScrolling = false;
      if (scrollValue[conversationId]) {
        isScrolling = true;
      }
      scrollTop(ref, element, localPagination[conversationId], scrollValue[conversationId], isScrolling);
    }
  }, [allMessages]);

  useEffect(() => {
    if (!isCreateChat.length) {
      conversationId && dispatch(getConversationIdAction(0));
      setAllMessages((prev) => ({ ...prev, 0: [] }));
    } else {
      dispatch(getConversationIdAction(isCreateChat[0].id));
    }
  }, [isCreateChat]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className='conversations__container'
    >
      <Grid item xs={12} id='messages' onScroll={scrollHandler} >
        <>
          {allMessages[conversationId] && allMessages[conversationId].map(({
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
