/* eslint-disable @typescript-eslint/indent */
import React, {
  useEffect, useState, useRef,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { History } from 'history';
import { Grid } from '@material-ui/core';
import {
  conversationUserHistoryActionRequest,
  getConversationIdAction,
  clearConversationData,
} from '../../redux/conversations/constants/actionConstants';
import { RootState } from '../../redux/reducer';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import { contextMenuAction } from '../../redux/common/commonActions';
import {
  Files, CurrentConversationMessages, ScrollValue, Pagination,
} from './interfaces';
import { Messages } from '../../redux/conversations/constants/interfaces';
import { checkIsShowAvatar, scrollTop, settingFilesObject } from './helpers/userHistoryConversations';
import './styles/styles.scss';
import { setMessageDate } from '../../common/getCorrectDateFormat';
import ChatsWrapper from '../../components/chatsWrapper';

interface ParamsId {
  id: string
}

interface Props<H> {
  history: H
}

const getCurrentScrollTop = (element: any) => element.scrollTop;

export default function UserConversationHistoryPage({ history }: Props<History>) {
  const dispatch = useDispatch();
  const conversationId = +useParams<ParamsId>().id;
  const location = useLocation();
  const isCreateChat = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.createConversation.success.data);
  const { id: opponentId, name } = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.opponentId);
  const messageHistory = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.data);
  const pagination = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.userHistoryConversation.success.pagination);
  const lastMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.lastMessages);
  const editedMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.editedMessage);
  const deletedMessage = useSelector(({ userConversationReducer }: RootState) => userConversationReducer.deleteMessageId.id);
  const { userId, firstName } = useSelector(({ authReducer }: RootState) => authReducer.tokenPayload);
  const [allMessages, setAllMessages] = useState<CurrentConversationMessages>({});
  const [localPagination, setLocalPagination] = useState<Pagination>({});
  const [scrollValue, setScrollValue] = useState<ScrollValue>({});
  const [files, setFiles] = useState<Files>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);
  const [timeDivCounter, setTimeDivCounter] = useState<number>(0);
  const messageEdit = useSelector(({ commonReducer }: RootState) => commonReducer.messageEdit);
  const ref = useRef(null);

  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (allMessages[conversationId]?.length % (15 + timeDivCounter) === 0 && element.scrollTop === 0) {
      dispatch(conversationUserHistoryActionRequest(conversationId, localPagination[conversationId] + 15));
    }
  };

  const handleCloseContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (event.type === 'contextmenu') {
      event.preventDefault();
      console.log('prevent');
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
    });
    setTimeDivCounter(newArr.filter((el: Messages) => el.component).length);
    setLocalPagination((value) => ({ ...value, [conversationId]: pagination.currentPage }));
    setAllMessages((messages) => ({ ...messages, [conversationId]: [...newArr, ...(messages[conversationId] === undefined ? [] : messages[conversationId])], 0: [] }));
  }, [messageHistory]);

  useEffect(() => {
    const chatID:number = +Object.keys(lastMessage)[0];
    if (location.pathname === '/newchat' && !(NaN in allMessages)) {
      return;
    }
    if (isNaN(conversationId)) {
      history.push(`/chat/${chatID}`);
    }
    if (Object.keys(lastMessage).length && conversationId in lastMessage) {
      setAllMessages((messages) => ({ ...messages, [conversationId]: [...messages[conversationId], lastMessage[conversationId]] }));
    }
  }, [lastMessage]);

  useEffect(() => {
    console.log('editMessage');
    setAllMessages((messages) => ({
      ...messages,
      [conversationId]: messages[conversationId].map((el) => {
        if (editedMessage && el.id === editedMessage.id) return { ...el, ...editedMessage };
        return el;
      }),
    }));
  }, [editedMessage]);

  useEffect(() => {
    console.log('deleteMessage');
    setAllMessages((messages) => ({
      ...messages,
      [conversationId]: messages[conversationId].filter((el) => deletedMessage && el.id !== deletedMessage),
    }));
  }, [deletedMessage]);

  useEffect(() => {
    if (opponentId) {
      dispatch(getConversationIdAction(0, ''));
      if (isCreateChat.length) {
        dispatch(getConversationIdAction(isCreateChat[0].id, 'dialog'));
      }
    }
  }, [isCreateChat]);

  return (
    <ChatsWrapper>
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
            height: messageEdit.isEdit ? 'calc(100% - 100px)' : 'calc(100% - 50px)',
            overflowY: 'scroll',
          }}
        >
          <>
            {isNaN(conversationId) && !opponentId
              ? <p>Выберите чат</p>
              : opponentId && !conversationId
                ? <p> Отправьте новое соообщение, чтобы создать чат</p>
                : allMessages[conversationId] && allMessages[conversationId].length === 0 ? <p> В этом чате еще нет соообщений</p> : allMessages[conversationId] && allMessages[conversationId].map(
                  ({
                    fkSenderId, message, id, sendDate, User, Files, component,
                  }, index: number, arr) => {
                    // /console.log(arr[index + 1].sendDate, sendDate);
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
                      />
                    );
                  },
                )}
            <div style={{ height: '50px' }} ref={ref}></div>
          </>
        </Grid>
        {(!!conversationId || !!opponentId) && (
          <MessageInput
            allMessages={allMessages}
            conversationId={conversationId}
            userId={userId}
            firstName={firstName}
            openFileDialog={openFileDialog}
            files={files}
            handleOpenDialog={handleOpenDialog}
            isOpenDialog={isOpenDialog}
            opponentId={opponentId}
          />
        )}
        {!isInputState && <input
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
          multiple
          onChange={onFilesAdded}
        />}
      </div>
    </ChatsWrapper>
  );
}
