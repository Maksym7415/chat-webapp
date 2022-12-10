import React, { useLayoutEffect, useState } from "react";
import clsx from "clsx";
import { Divider } from "@mui/material";
import useStyles from "./styles";
import languages from "../../../../../../config/translations";
import { getCurrentDay, uuid } from "../../../../../../helpers";
import UserAvatar from "../../../../../../components/avatar/userAvatar";
import {
  actionsTypeObjectSelected,
  actionsSelectedMessages,
} from "../../../../../../actions";
import { TYPES_CONVERSATIONS } from "../../../../../../config/constants/general";
import { useAppSelector, useAppDispatch } from "../../../../../../hooks/redux";
import store from "../../../../../../reduxToolkit/store";

// need ts
// rework

const Message = ({
  messageData,
  isShowAvatar,
  userId,
  typeConversation,
}: any) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

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

  // FUNCTIONS
  const handleOnPressChat = () => {
    if (Object.keys(selectedMessages).length && messageData.message) {
      selectedMessages?.[messageData.id]
        ? store.dispatch(
            actionsSelectedMessages(
              messageData,
              actionsTypeObjectSelected.remove
            )
          )
        : store.dispatch(
            actionsSelectedMessages(messageData, actionsTypeObjectSelected.add)
          );
    }
  };

  // USEEFFECTS
  useLayoutEffect(() => {
    // shared message
    if (messageData.forwardedUser) {
      return setSettings((prev) => ({
        ...prev,
        typeMessage: "shared",
        classNames: {
          root: classes.containerShared,
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
          root: classes.containerSender,
          rootPaper: classes.paperSenderMessage,
        },
      }));
    }
    // otherUser message
    return setSettings((prev) => ({
      ...prev,
      typeMessage: "otherUser",
      classNames: {
        root: classes.containerFriend,
        rootPaper: classes.paperFriendMessage,
      },
    }));
  }, []);

  return (
    <div
      className={clsx(settings.classNames.root, {
        [classes.selectedMessages]: selectedMessages?.[messageData.id],
      })}
      onClick={handleOnPressChat}
      // onLongPress={() => {
      //   !Object.keys(selectedMessages).length &&
      //     (messageData.message || !!messageData.Files.length) &&
      //     store.dispatch(
      //       selectedMessagesActions(messageData, actionsTypeObjectSelected.add),
      //     );
      // }}
      style={{
        justifyContent:
          userInfo.id === messageData.User.id ? "flex-end" : "flex-start",
      }}
    >
      <div className={classes.wrapperUp}>
        {[TYPES_CONVERSATIONS.chat].includes(typeConversation) &&
          isShowAvatar && (
            <UserAvatar
              source={messageData.User.userAvatar}
              name={`${messageData.User.firstName} ${messageData.User.lastName}`}
              sizeAvatar={38}
            />
          )}
        <div className={classes.wrapper}>
          <div className={settings.classNames.rootPaper}>
            {messageData.isEdit && (
              <p className={classes.edited}>
                {languages[lang].generals.edited}
              </p>
            )}
            {[TYPES_CONVERSATIONS.chat, TYPES_CONVERSATIONS.dialog].includes(
              typeConversation
            ) &&
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
            <div className={settings.classNames.wrapperMessage}>
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
                      alignSelf:
                        userInfo.id === messageData.User.id
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >
                    {/* {messageData.Files.map((file) =>
                      ["png", "jpg", "jpeg"].includes(file.extension) ? (
                        <Image
                          key={uuid()}
                          className={classes.image}
                          source={{
                            uri: `${process.env.REACT_APP_BASE_URL}/${file.fileStorageName}.${file.extension}`,
                          }}
                        />
                      ) : null
                    )} */}
                  </div>
                )}
                {messageData.message && (
                  <p className={classes.messageText}>{messageData.message}</p>
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
    </div>
  );
};

export default Message;
