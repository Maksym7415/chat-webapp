import React, { useRef, useCallback } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useStyles from "./styles";
import { Typography, Box } from "@mui/material";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import languages from "../../../../config/translations";
import { setMessageDate, uuid } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/redux";
import Message from "./components/message";

// need ts

const MainContent = ({
  userId,
  conversationId,
  opponentId,
  typeConversation,
  allMessages,
}: any) => {
  //HOOKS
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  const listRef: any = React.useRef({});
  const sizeMap: any = useRef({});

  const messagesReverse = allMessages?.[conversationId]
    ? [...allMessages?.[conversationId]]
    : [];

  // FUNCTIONS
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index) => sizeMap.current[index] || 50;

  // RENDER
  const RowItem = ({ index, setSize }: any) => {
    const messageData = messagesReverse[index];
    const rowRef: any = useRef(null);

    React.useEffect(() => {
      rowRef && setSize(index, rowRef?.current?.clientHeight || 50);
    }, [setSize, index]);

    let isShowAvatar = false;
    if (messageData?.fkSenderId !== userId) {
      isShowAvatar = true;
    }
    if (messageData?.component) {
      return (
        <div className={classes.wrapperSendData} key={uuid()} ref={rowRef}>
          <p className={classes.sendDataText}>
            {setMessageDate(new Date(messageData.sendDate))}
          </p>
        </div>
      );
    }

    return (
      <div ref={rowRef}>
        <Message
          key={uuid()}
          conversationId={conversationId}
          isShowAvatar={isShowAvatar}
          messageData={messageData}
          userId={userId}
          typeConversation={typeConversation}
          index={index}
        />
      </div>
    );
  };

  return (
    <Box className={classes.wrapperMessages} id="scrollableDiv">
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
                            <RowItem index={index} setSize={setSize} />
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
