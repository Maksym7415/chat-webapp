/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { History } from 'history';
import {
  Grid,
} from '@material-ui/core';
import {
  conversationUserHistoryActionRequest,
  getConversationIdAction,
  clearConversationData,
} from '../../../../redux/conversations/constants/actionConstants';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import AddFiles from './components/addFilesComponent';
import { contextMenuAction } from '../../../../redux/common/commonActions';
import {
  Files, CurrentConversationMessages, Pagination,
} from '../../interfaces';
import { Messages } from '../../../../redux/conversations/constants/interfaces';
import { checkIsShowAvatar, scrollTop, settingFilesObject } from '../../helpers/userHistoryConversations';
import './styles/styles.scss';
import { setMessageDate } from '../../../../common/getCorrectDateFormat';
import languages from '../../../../translations';

// hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

interface ParamsId{
  id: string
}

interface Props<H>{
  history: H
}

export default function UserConversationHistoryPage({ history }: Props<History>) {
  // HOOKS
  const dispatch = useAppDispatch();
  const conversationId = +useParams<any>()?.id;

  // REFS
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);

  // SELECTORS
  const lang = useAppSelector(({ commonReducer }) => commonReducer.lang);
  const isCreateChat = useAppSelector(({ userConversationReducer }) => userConversationReducer.createConversation.success.data);
  const opponentId = useAppSelector(({ userConversationReducer }) => userConversationReducer.opponentId.id);
  const messageHistory = useAppSelector(({ userConversationReducer }) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useAppSelector(({ userConversationReducer }) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useAppSelector(({ userConversationReducer }) => userConversationReducer.lastMessages);
  const { userId, firstName } = useAppSelector(({ authReducer }) => authReducer.tokenPayload);
  const sheraMessages = useAppSelector(({ commonReducer }) => commonReducer.sheraMessages);
  const messageEdit = useAppSelector(({ commonReducer }) => commonReducer.messageEdit);

  // STATES
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});
  const [files, setFiles] = useState<Files>({});
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);
  const [timeDivCounter, setTimeDivCounter] = useState<number>(0);

  // VARIABLES

  // FUNCTIONS
  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (allMessages[conversationId]?.length % (15 + timeDivCounter) === 0 && element.scrollTop === 0) {
      dispatch(conversationUserHistoryActionRequest(conversationId, localPagination[conversationId] + 15));
    }
  };

  const handleCloseContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (event.type === 'contextmenu') {
      event.preventDefault();
    }
    if (event.type === 'click') {
      dispatch(contextMenuAction({
        yPos: '',
        xPos: '',
        isShowMenu: false,
        messageId: 0,
        config: [],
      }));
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
  };

  // USEEFFECTS
  useEffect(() => () => {
    dispatch(clearConversationData());
  }, []);

  useEffect(() => {
    setIsInputState(false);
  }, [files]);

  useEffect(() => {
    if (messageEdit.isDelete) {
      setAllMessages((messages) => ({ ...messages, [conversationId]: messages[conversationId].filter((message: any) => message.id !== messageEdit.messageId) }));
    }
  }, [messageEdit.isDelete]);

  useEffect(() => {
    if (conversationId) {
      dispatch(conversationUserHistoryActionRequest(conversationId, 0));
    }
    if (sheraMessages.length) {
      // console.log(sheraMessages, 'sheraMessages');
    }
  }, [conversationId]);

  useEffect(() => {
    scrollTop(ref);
    let currentDay = 0;
    let newArr: any = [];
    messageHistory.map((el: Messages) => {
      if (new Date(el.sendDate).getDate() !== currentDay) {
        currentDay = new Date(el.sendDate).getDate();
        newArr = [...newArr, { component: 'div', sendDate: el.sendDate }, el];
      } else {
        currentDay = new Date(el.sendDate).getDate();
        newArr = [...newArr, el];
      }
      return el;
    });

    setTimeDivCounter(newArr.filter((el: Messages) => el.component).length);
    setLocalPagination((value) => ({ ...value, [conversationId]: pagination.currentPage }));
    setAllMessages((messages) => ({ ...messages, [conversationId]: [...newArr] }));
  }, [messageHistory]);

  useEffect(() => {
    if (Object.keys(lastMessage).length && conversationId in lastMessage) {
      if (lastMessage[conversationId].isEditing) {
        return setAllMessages((messages) => ({ ...messages, [conversationId]: messages[conversationId].map((message) => (message.id === lastMessage[conversationId].id ? { ...message, message: lastMessage[conversationId].message } : message)) }));
      }
      setAllMessages((messages) => ({ ...messages, [conversationId]: [...messages[conversationId], lastMessage[conversationId]] }));
    }
  }, [lastMessage]);

  useEffect(() => {
    if (opponentId) {
      dispatch(getConversationIdAction(0, ''));
      if (isCreateChat.length) {
        dispatch(getConversationIdAction(isCreateChat[0].id, 'dialog'));
      }
    }
  }, [isCreateChat]);

  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      className='conversations__container'
      // onScroll={scrollHandler}
      // id='messages'
      onClick={handleCloseContextMenu}
      onContextMenu={handleCloseContextMenu}
    >
      <Grid
        item
        xs={12}
        className='pd-left-10'
        onScroll={scrollHandler}
        style={{
          height: (messageEdit.isEdit || sheraMessages.length) ? 'calc(100% - 100px)' : 'calc(100% - 50px)',
          overflowY: 'scroll',
        }}
      >
        <>
          {Number.isNaN(conversationId) && !opponentId ? <p>{languages[lang].mainScreen.chooseAChat}</p> : opponentId && !conversationId ? <p>{languages[lang].mainScreen.sendANewMessageToStartAChat}</p>
            : allMessages[conversationId] && allMessages[conversationId].length === 0 ? <p>{languages[lang].mainScreen.thereAreNoMessagesInChatYet}</p> : allMessages[conversationId] && allMessages[conversationId].map(({
              fkSenderId, message, id, sendDate, User, Files, component, isEditing,
            }, index: number, arr) => {
              let isShowAvatar = false;
              if (fkSenderId !== userId && checkIsShowAvatar(allMessages[conversationId], userId, index)) isShowAvatar = true;
              if (component) {
                return (
                  <React.Fragment key={sendDate}>
                    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '600px' }}>
                      <p style={{
                        maxWidth: '125px', padding: '1px 7px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: '#fffefeb5', borderRadius: '5px',
                      }}>
                        {setMessageDate(new Date(sendDate))}
                      </p>
                    </div>
                  </React.Fragment>
                );
              }
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
                  component={component}
                  conversationId={conversationId}
                  isEditing={isEditing}
                  allMassages={allMessages[conversationId]}
                />
              );
            })}
          <div style={{ height: '50px' }} ref={ref}></div>
        </>
      </Grid>
      {(!!conversationId || !!opponentId) && (
        <MessageInput
          allMessages={allMessages}
          setAllMessages={setAllMessages}
          conversationId={conversationId}
          userId={userId}
          firstName={firstName}
          opponentId={opponentId}
          openFileDialog={openFileDialog}
          history={history}
        />
      )}
      {!isInputState && <input
        ref={inputRef}
        style={{ display: 'none' }}
        type="file"
        multiple
        onChange={onFilesAdded}
      />}
      <AddFiles files={files} isOpen={isOpenDialog} handleOpenDialog={handleOpenDialog} handleAddFile={openFileDialog} setFiles={setFiles}/>
    </div>
  );
}
