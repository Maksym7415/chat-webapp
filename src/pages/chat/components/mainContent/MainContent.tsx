import React from "react";
import useStyles from "./styles";
import { Typography, Box, Grid } from "@mui/material";
import Message from "./components/message";
import RenderInfoCenterBox from "../../../../components/renders/renderInfoCenterBox";
import languages from "../../../../config/translations";
import { checkIsShowAvatar, setMessageDate, uuid } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/redux";

// need ts

const MainContent = ({
  userId,
  conversationId,
  opponentId,
  typeConversation,
  allMessages,
  heightContent,
}: any) => {
  //HOOKS
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
