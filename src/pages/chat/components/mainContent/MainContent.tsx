import React from "react";
import clsx from "clsx";
import useStyles from "./styles";
import { Typography, Box, Grid } from "@mui/material";
// import {TYPES_CONVERSATIONS} from '../../../../config/constants/general';
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import Message from "./components/message";
import languages from "../../../../config/translations";
import {
  checkIsShowAvatar,
  setMessageDate,
  scrollTop,
  uuid,
} from "../../../../helpers";

const MainContent = ({
  userId,
  conversationId,
  opponentId,
  typeConversation,
  allMessages,
  heightContent,
}: any) => {
  //HOOKS

  // STYLES
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);

  return (
    <Grid
      item
      xs={12}
      className={classes.wrapperMessages}
      style={{
        height: heightContent,
      }}
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
                                {setMessageDate(new Date(messageData.sendDate))}
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
    </Grid>
  );
};

export default React.memo(MainContent);
