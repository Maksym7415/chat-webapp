import React, {
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import clsx from "clsx";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { contextMenu } from "react-contexify";
import CheckIcon from "@mui/icons-material/Check";
import useStylesMessage from "./components/message/styles";
import useStyles from "./styles";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  IconButton,
  Divider,
} from "@mui/material";
// import Message from "./components/message";
import * as config from "./components/message/config";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import languages from "../../../../config/translations";
import {
  checkIsShowAvatar,
  setMessageDate,
  uuid,
  getCurrentDay,
} from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getConversationMessagesRequest } from "../../../../reduxToolkit/conversations/requests";
import { setAllMessagesAction } from "../../../../reduxToolkit/app/slice";
import {
  // AutoSizer,
  // List,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import UserAvatar from "../../../../components/avatar/userAvatar";
import {
  actionsTypeObjectSelected,
  actionsSelectedMessages,
} from "../../../../actions";
import { TYPES_CONVERSATIONS } from "../../../../config/constants/general";
import store from "../../../../reduxToolkit/store";
import { setContextMenuConfigAction } from "../../../../components/contextMenu/redux/slice";
import { eContextMenuId } from "../../../../ts/enums/app";
import { actionsMessagesChat } from "../../../../actions";
import Message from "./components/message";

// need ts

const MainContent = ({
  userId,
  conversationId,
  opponentId,
  typeConversation,
  allMessages,
  setErrorBack,
  errorBack,
  setIsFetching,
  conversationData,
}: any) => {
  //HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const userHistoryConversations = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.userHistoryConversations
  );

  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
  });

  const listRef: any = React.useRef({});
  const rowHeights = useRef({});

  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};
  const messagesReverse = allMessages?.[conversationId]
    ? [...allMessages?.[conversationId]]
    : [];

  // FUNCTIONS
  const [isLoading, setIsLoading] = React.useState(false);

  const onScroll = React.useCallback(
    (e) => {
      const distanceToBottom =
        e.currentTarget.scrollHeight -
        e.currentTarget.scrollTop -
        e.currentTarget.clientHeight;

      if (distanceToBottom < 600 && !isLoading) {
        setIsLoading(true);
        console.log(distanceToBottom, "distanceToBottom");
        new Promise((res: any) => {
          setTimeout(() => {
            // setData((prev) => [
            //   ...prev,
            //   ...Array.from({ length: 500 }, (_, i) => i + prev.length),
            // ]);
            setIsLoading(false);
            res();
          }, 1000);
        });
      }
    },
    [isLoading]
  );

  const RowItem = ({ index, setSize }: any) => {
    const messageData = messagesReverse[index];
    const rowRef: any = useRef(null);

    // SELECTORS
    const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
    const selectedMessages = useAppSelector(
      ({ appSlice }) => appSlice.selectedMessages
    );
    const userInfo = useAppSelector(({ userSlice }) => userSlice.userInfo);

    // STATES
    const [settings, setSettings] = useState<any>({
      typeMessage: "",
      classNames: {
        root: "",
        rootPaper: "",
        wrapperMessage: {},
      },
      styles: {},
    });

    React.useEffect(() => {
      // console.log(rowRef, "rowRef");
      // console.log(rowRef.current?.clientHeight, "rowRef.current?.clientHeight");
      // console.log(
      //   rowRef.current.getBoundingClientRect().height,
      //   "rowRef.current.getBoundingClientRect().height"
      // );
      // rowRef &&
      //   console.log(
      //     document.getElementById(`message_${data.id}`)?.clientHeight,
      //     "clientHeight"
      //   );
      // rowRef && setSize(index, rowRef.current.getBoundingClientRect().height);
      rowRef && setSize(index, rowRef?.current?.clientHeight || 50);
    }, [setSize, index]);

    // USEEFFECTS
    useLayoutEffect(() => {
      // shared message
      if (messageData.forwardedUser) {
        return setSettings((prev) => ({
          ...prev,
          typeMessage: "shared",
          classNames: {
            rootPaper: classes.paperSharedMessage,
            wrapperMessage: classes.wrapperTextMessageShared,
          },
        }));
      }
      // myMessage message
      if (messageData.fkSenderId === userId) {
        return setSettings((prev) => ({
          ...prev,
          typeMessage: "myMessage",
          classNames: {
            rootPaper: classes.paperSenderMessage,
          },
        }));
      }
      // otherUser message
      return setSettings((prev) => ({
        ...prev,
        typeMessage: "otherUser",
        classNames: {
          rootPaper: classes.paperFriendMessage,
        },
      }));
    }, []);

    const classesRootPaper = React.useMemo(() => {
      if (messageData.forwardedUser) return classes.paperSharedMessage;
      if (messageData.fkSenderId === userId) return classes.paperSenderMessage;
      return classes.paperFriendMessage;
    }, []);

    let isShowAvatar = false;
    if (messageData?.fkSenderId !== userId) {
      isShowAvatar = true;
    }
    if (messageData?.component) {
      // return <></>;
      return (
        <div className={classes.wrapperSendData} key={uuid()} ref={rowRef}>
          <p className={classes.sendDataText}>
            {setMessageDate(new Date(messageData.sendDate))}
          </p>
        </div>
      );
    }
    // console.log(rowRef, "rowRefRender");
    // console.log(data, "data");
    // return <></>;

    const selfMessage = messageData.component
      ? false
      : userInfo.id === messageData.User.id;

    return (
      // <div
      //   ref={rowRef}
      //   style={{
      //     padding: "20px 0",
      //   }}
      // >
      //   <div
      //     style={{
      //       position: "relative",
      //       display: "flex",
      //       flexDirection: "column",
      //       maxWidth: 500,
      //       backgroundColor: "#ff215e",
      //       padding: "15px",
      //       marginLeft: 40,
      //       borderRadius: 10,
      //       // overflow: "hidden",
      //       alignSelf: "flex-end",
      //       // margin: "20px 0",
      //     }}
      //   >
      //     {" "}
      //     <p>{data.message}</p>
      //   </div>
      // </div>
      <div ref={rowRef}>
        {/* <div
          className={clsx(classes.root, {})}
          // onLongPress={() => {
          //   !Object.keys(selectedMessages).length &&
          //     (messageData.message || !!messageData.Files.length) &&
          //     store.dispatch(
          //       selectedMessagesActions(messageData, actionsTypeObjectSelected.add),
          //     );
          // }}

          style={{
            gridTemplateColumns: "1fr",
            cursor: "inherit",
            // height: ref?.current?.clientHeight
            //   ? ref?.current.clientHeight + 10
            //   : "100%",
          }}
        >
          <div
            className={classes.wrapperUp}
            style={{
              justifyContent: selfMessage ? "flex-end" : "flex-start",
            }}
          >
            {[TYPES_CONVERSATIONS.chat].includes(typeConversation) &&
              isShowAvatar && (
                <UserAvatar
                  source={messageData.User.userAvatar}
                  name={`${messageData.User.firstName} ${messageData.User.lastName}`}
                  sizeAvatar={38}
                />
              )}
            <div className={classes.wrapper}>
              <div
                // className={settings.classNames.rootPaper}
                className={classesRootPaper}
                style={{ padding: "15px" }}
              >
                {messageData.isEdit && (
                  <p className={classes.edited}>
                    {languages[lang].generals.edited}
                  </p>
                )}
                {[
                  TYPES_CONVERSATIONS.chat,
                  TYPES_CONVERSATIONS.dialog,
                ].includes(typeConversation) &&
                  messageData.forwardedUser && (
                    <div className={classes.wrapperName}>
                      <p className={classes.name}>
                        {messageData.forwardedUser
                          ? languages[lang].generals.forwardedMessage
                          : messageData.User.tagName ||
                            `${messageData.User.firstName} ${messageData.User.lastName}`}
                      </p>
                    </div>
                  )}
                <div>
                  {messageData.forwardedUser && (
                    <Divider className={classes.divider} />
                  )}
                  <div>
                    {messageData.forwardedUser && (
                      <p className={classes.wrapperMessageUserName}>
                        {messageData.User.tagName ||
                          `${messageData.User.firstName} ${messageData.User.lastName}`}
                      </p>
                    )}
                    {messageData.Files && !!messageData.Files.length && (
                      <div
                        className={classes.wrapperFile}
                        style={{
                          alignSelf: selfMessage ? "flex-end" : "flex-start",
                        }}
                      ></div>
                    )}
                    {messageData.message && (
                      <p className={classes.messageText}>
                        {messageData.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className={classes.wrapperDate}>
                  <p className={classes.messageSendTime}>
                    {getCurrentDay(new Date(messageData.sendDate), true)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <Message
          // ref={rowRef}
          key={uuid()}
          conversationId={conversationId}
          isShowAvatar={isShowAvatar}
          messageData={messageData}
          userId={userId}
          typeConversation={typeConversation}
          // setSize={setSize}
          index={index}
        />
      </div>
    );
  };

  const getRowRender = ({ index, style, key, parent }) => {
    const messageData = messagesReverse[index];

    console.log(messageData, "messageData");
    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        {(() => {
          let isShowAvatar = false;
          if (messageData?.fkSenderId !== userId) {
            isShowAvatar = true;
          }
          if (messageData?.component) {
            // return <></>;
            return (
              <div style={{ ...style }}>
                <div className={classes.wrapperSendData} key={uuid()}>
                  <p className={classes.sendDataText}>
                    {setMessageDate(new Date(messageData.sendDate))}
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div style={{ ...style }}>
              <Message
                // ref={rowRef}
                key={uuid()}
                conversationId={conversationId}
                conversationData={conversationData}
                isShowAvatar={isShowAvatar}
                messageData={messageData}
                userId={userId}
                typeConversation={typeConversation}
                // setSize={setSize}
                index={index}
              />
            </div>
          );
        })()}
      </CellMeasurer>
    );
  };

  console.log("render");

  const sizeMap = useRef({});
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index) => sizeMap.current[index] || 50;

  function getRowHeight(index) {
    return rowHeights.current[index] + 8 || 82;
  }

  // 1
  useEffect(() => {
    if (messagesReverse.length > 0) {
      listRef && scrollToBottom();
    }
    // eslint-disable-next-line
  }, [conversationId, listRef]);

  function Row({ index, style }) {
    const rowRef: any = useRef({});

    const messageData = messagesReverse[index];

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
      // eslint-disable-next-line
    }, [rowRef]);

    let isShowAvatar = false;
    if (messageData?.fkSenderId !== userId) {
      isShowAvatar = true;
    }
    if (messageData?.component) {
      // return <></>;
      return (
        <div style={style}>
          <div className={classes.wrapperSendData} key={uuid()} ref={rowRef}>
            <p className={classes.sendDataText}>
              {setMessageDate(new Date(messageData.sendDate))}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={style}>
        <div ref={rowRef}>
          <Message
            // ref={rowRef}
            key={uuid()}
            conversationId={conversationId}
            conversationData={conversationData}
            isShowAvatar={isShowAvatar}
            messageData={messageData}
            userId={userId}
            typeConversation={typeConversation}
            // setSize={setSize}
            index={index}
          />
        </div>
      </div>
    );
  }

  function setRowHeight(index, size) {
    // listRef.current.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  function scrollToBottom() {
    console.log(listRef, "listRef");
    console.log(rowHeights, "rowHeights");

    // listRef &&
    //   listRef?.current.scrollToItem(messagesReverse?.length - 1, "end");
    // listRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    const section = document.querySelector(".listMessages");
    console.log(section, "section");
    section && section.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  return (
    <Box
      className={classes.wrapperMessages}
      // style={{
      //   height: heightContent,
      // }}
      id="scrollableDiv"
    >
      {(() => {
        if (Number.isNaN(conversationId) && !opponentId) {
          return (
            <RenderInfoCenterBox>
              <Typography>{languages[lang].mainScreen.chooseAChat}</Typography>
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
                messagesReverse && (
                  // <AutoSizer style={{ height: "100%", width: "100%" }}>
                  //   {({ height, width }) => (
                  //     <List
                  //       className="listMessages"
                  //       id={"listMessages"}
                  //       height={height - 1}
                  //       itemCount={messagesReverse.length}
                  //       itemSize={getRowHeight}
                  //       // ref={listRef}

                  //       width={width}
                  //     >
                  //       {Row}
                  //     </List>
                  //   )}
                  // </AutoSizer>

                  // <AutoSizer>
                  //   {({ height, width }) => (
                  //     <List
                  //       height={height - 1}
                  //       rowCount={messagesReverse.length}
                  //       rowHeight={cellMeasurerCache.rowHeight}
                  //       width={width}
                  //       rowRenderer={getRowRender}
                  //       deferredMeasurementCache={cellMeasurerCache}
                  //     />
                  //   )}
                  // </AutoSizer>

                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        ref={listRef}
                        height={height - 1}
                        width={width}
                        itemCount={messagesReverse.length}
                        itemSize={getSize}
                      >
                        {({ index, style }) => (
                          <div
                            style={{
                              ...style,
                              left: " 50%",
                              transform: "translateX(-50%)",
                            }}
                            className={classes.infiniteScroll}
                          >
                            <RowItem
                              index={index}
                              setSize={setSize}
                              // windowWidth={windowWidth}
                            />
                            {/* <Message
                              // ref={rowRef}
                              key={uuid()}
                              conversationId={conversationId}
                              conversationData={conversationData}
                              messageData={messagesReverse[index]}
                              userId={userId}
                              typeConversation={typeConversation}
                              setSize={setSize}
                              index={index}
                            /> */}
                          </div>
                        )}
                      </List>
                    )}
                  </AutoSizer>
                )
              );
            }
          }
        }
      })()}
    </Box>
  );
};

export default React.memo(MainContent);

{
  /* <InfiniteScroll
dataLength={allMessages[conversationId].length}
next={handleScroll}
inverse={true} //
hasMore={
  // true
  allMessages[conversationId].length < pagination.allItems
}
className={classes.infiniteScroll}
loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
scrollableTarget="scrollableDiv"
>
{[...allMessages[conversationId]]
  .reverse()
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
            {setMessageDate(new Date(messageData.sendDate))}
          </p>
        </div>
      );
    }
    return (
      <Message
        key={uuid()}
        conversationId={conversationId}
        conversationData={conversationData}
        isShowAvatar={isShowAvatar}
        messageData={messageData}
        userId={userId}
        typeConversation={typeConversation}
      />
    );
  })}
</InfiniteScroll> */
}
