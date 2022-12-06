/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import ChatHeader from "./components/header/ChatHeader";
import ChatBottom from "./components/bottom";
import useStyles from "./styles";
import Message from "./components/message";
import RenderInfoCenterBox from "../../components/renders/renderInfoCenterBox";
import {
  checkIsShowAvatar,
  setMessageDate,
  scrollTop,
  uuid,
} from "../../helpers";
import "../../styles/index.scss";
import languages from "../../config/translations";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getConversationMessagesRequest } from "../../reduxToolkit/conversations/requests";
import { setAllMessagesAction } from "../../reduxToolkit/app/slice";

const loadMessageOffset = 15;

export default function Chat({}) {
  // HOOKS
  const dispatch = useAppDispatch();
  const params = useParams<any>();
  const route: any = { params: {} };
  const classes = useStyles();

  // REFS
  const inputRef = useRef<HTMLInputElement>(null);
  const refBottom = useRef(null);
  const scrollBottomRef = useRef(null);

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const { userId, firstName } = useAppSelector(
    ({ authSlice }) => authSlice.tokenPayload
  );
  const sheraMessages = useAppSelector(
    ({ appSlice }) => appSlice.sheraMessages
  );
  const messageEdit = useAppSelector(({ appSlice }) => appSlice.messageEdit);
  const userHistoryConversations = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );
  const allMessages = useAppSelector(({ appSlice }) => appSlice.allMessages);
  // const openConversationData = useAppSelector(
  //   ({ chatSlice }) => chatSlice.openConversationData
  // );
  const conversationsList = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationsList.data
  );

  // STATES
  const [files, setFiles] = useState<any>({});
  const [errorBack, setErrorBack] = useState<string>("");
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isInputState, setIsInputState] = useState<boolean>(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [showScrollToButton, setShowScrollToButton] = React.useState(false);

  // VARIABLES
  const conversationId = React.useMemo(() => params?.id || 0, [params]);
  const opponentId: any = route?.params?.opponentId;
  // const conversationData = { conversationType: "" };
  const conversationData: any = React.useMemo(
    () => conversationsList?.[conversationId] || {},
    [conversationsList, conversationId]
  );
  const typeConversation =
    conversationData?.conversationType?.toLowerCase() || "";
  let SectionListReference = null;
  const pagination: any =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // FUNCTIONS
  const scrollHandler = (event: React.SyntheticEvent<HTMLElement>) => {
    let element = event.currentTarget;
    if (
      pagination.allItems > pagination.currentPage &&
      allMessages[conversationId].length >= loadMessageOffset
    ) {
      console.log(pagination, "pagination");
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: pagination.currentPage + loadMessageOffset,
          },
          cb: (response) => {
            errorBack && setErrorBack("");
            dispatch(
              setAllMessagesAction({
                [conversationId]: [
                  ...response.data,
                  ...allMessages[conversationId],
                ],
              })
            );
          },
          errorCb: (error) => {
            setErrorBack(error.message);
            setIsFetching(false);
          },
        })
      );
    }
  };

  const handleOpenDialog = (isOpen: boolean) => {
    if (!isOpen) {
      setFiles({});
    }
    setIsOpenDialog(isOpen);
  };

  // USEEFFECTS
  useEffect(() => {
    setIsInputState(false);
  }, [files]);

  useLayoutEffect(() => {
    if (!allMessages[conversationId] && conversationId) {
      console.log("!render!");
      setIsFetching(true);
      dispatch(
        getConversationMessagesRequest({
          data: {
            id: conversationId,
            offset: 0,
          },
          cb: (response) => {
            let currentDay = 0;
            let newArr = [];
            response.data.map((el) => {
              if (new Date(el.sendDate).getDate() !== currentDay) {
                currentDay = new Date(el.sendDate).getDate();
                newArr = [
                  ...newArr,
                  { component: "div", sendDate: el.sendDate },
                  el,
                ];
              } else {
                currentDay = new Date(el.sendDate).getDate();
                newArr = [...newArr, el];
              }
              return el;
            });
            dispatch(
              setAllMessagesAction({
                [conversationId]: newArr,
              })
            );
            errorBack && setErrorBack("");
            setIsFetching(false);
          },
          errorCb: (error) => {
            console.log(error, "error");
            setErrorBack(error.message);
            setIsFetching(false);
          },
        })
      );
    }
  }, [conversationId]);

  // RENDERS
  const renderMainContent = React.useMemo(() => {
    return (
      <>
        {(() => {
          if (Number.isNaN(conversationId) && !opponentId) {
            return (
              <RenderInfoCenterBox>
                <Typography>
                  {languages[lang].mainScreen.chooseAChat}
                </Typography>
              </RenderInfoCenterBox>
            );
          } else {
            if (!conversationId) {
              return (
                <RenderInfoCenterBox>
                  <Typography>
                    {languages[lang].mainScreen.sendANewMessageToStartAChat}
                  </Typography>
                </RenderInfoCenterBox>
              );
            } else {
              if (
                allMessages[conversationId] &&
                allMessages[conversationId].length === 0
              ) {
                return (
                  <RenderInfoCenterBox>
                    <Typography>
                      {languages[lang].mainScreen.thereAreNoMessagesInChatYet}
                    </Typography>
                  </RenderInfoCenterBox>
                );
              } else {
                return (
                  allMessages[conversationId] && (
                    <Box>
                      {[...allMessages[conversationId]]
                        // .reverse()
                        .map((messageData, index) => {
                          let isShowAvatar = false;
                          if (
                            messageData.fkSenderId !== userId &&
                            checkIsShowAvatar(
                              allMessages[conversationId],
                              userId,
                              index
                            )
                          ) {
                            isShowAvatar = true;
                          }
                          if (messageData.component) {
                            return (
                              <div
                                className={classes.wrapperSendData}
                                key={uuid()}
                              >
                                <p className={classes.sendDataText}>
                                  {setMessageDate(
                                    new Date(messageData.sendDate)
                                  )}
                                </p>
                              </div>
                            );
                          }
                          return (
                            <Message
                              key={uuid()}
                              isShowAvatar={isShowAvatar}
                              messageData={messageData}
                              userId={userId}
                              typeConversation={typeConversation}
                            />
                          );
                        })}
                      {/* <ListItem ref={scrollBottomRef}></ListItem> */}
                    </Box>
                  )
                );
              }
            }
          }
        })()}
      </>
    );
  }, [
    allMessages[conversationId],
    sheraMessages,
    messageEdit,
    pagination,
    showScrollToButton,
  ]);

  if (isFetching) {
    return (
      <RenderInfoCenterBox>
        <CircularProgress size={60} />
      </RenderInfoCenterBox>
    );
  }

  if (errorBack) {
    return (
      <RenderInfoCenterBox>
        <Typography style={{ fontSize: 28, fontWeight: "500" }}>
          {errorBack}
        </Typography>
      </RenderInfoCenterBox>
    );
  }

  return (
    <Box
      className={classes.container}
      // onScroll={scrollHandler}
      id="messages"
      sx={{ width: "100%", height: "100vh" }}
    >
      <ChatHeader
        conversationData={conversationData}
        conversationId={conversationId}
        typeConversation={typeConversation}
      />
      <Grid
        item
        xs={12}
        className={classes.wrapperMessages}
        onScroll={scrollHandler}
        style={{
          height: `calc(100vh - ${
            (refBottom?.current?.clientHeight || 0) + 71
          }px)`,
        }}
      >
        {renderMainContent}
      </Grid>
      <ChatBottom
        ref={refBottom}
        firstName={firstName}
        userId={userId}
        // opponentId={opponentId}
        // openFileDialog={openFileDialog}
      />
    </Box>
  );
}
