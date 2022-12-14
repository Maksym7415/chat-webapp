import React from "react";
import useStyles from "./styles";
import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "./components/message";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import languages from "../../../../config/translations";
import { checkIsShowAvatar, setMessageDate, uuid } from "../../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { getConversationMessagesRequest } from "../../../../reduxToolkit/conversations/requests";
import { setAllMessagesAction } from "../../../../reduxToolkit/app/slice";

// need ts

const loadMessageOffset = 15;

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

  const pagination =
    userHistoryConversations?.[conversationId]?.pagination || {};

  // FUNCTIONS
  const handleScroll = (): any => {
    console.log("heelo");
    return dispatch(
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
  };

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
                allMessages[conversationId] && (
                  <InfiniteScroll
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
                  </InfiniteScroll>
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
