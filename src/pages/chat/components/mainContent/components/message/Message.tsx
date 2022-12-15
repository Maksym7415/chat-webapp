import React, { useLayoutEffect, useState } from "react";
import clsx from "clsx";
import { contextMenu } from "react-contexify";
import { Divider, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import * as config from "./config";
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
import { setContextMenuConfigAction } from "../../../../../../reduxToolkit/app/slice";
import { eContextMenuId } from "../../../../../../ts/enums/app";
import { actionsMessagesChat } from "../../../../../../actions";

// need ts
// rework

const stylePaper: React.CSSProperties = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  maxWidth: 500,
  borderRadius: 10,
  overflow: "hidden",
};

const Message = ({
  messageData,
  isShowAvatar,
  userId,
  typeConversation,
  conversationId,
  conversationData,
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

  const selfMessage = userInfo.id === messageData.User.id;

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
    if (selectedMessages.active && messageData.message) {
      selectedMessages?.messages?.[messageData.id]
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

  const handleClickContextMessage = async (item) => {
    await actionsMessagesChat({
      conversationId,
      typeAction: item.value,
      messageData,
    });
    contextMenu.hideAll();
  };

  // console.log(selectedMessages, "selectedMessages");
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

  return (
    <div
      className={clsx(classes.root, {
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
        gridTemplateColumns: selectedMessages.active ? "26px 1fr" : "1fr",
        cursor: selectedMessages.active ? "pointer" : "inherit",
      }}
    >
      {selectedMessages.active && (
        <div
          className={classes.messageSelectControl}
          style={{
            padding: selectedMessages?.messages?.[messageData.id] ? 0 : 11,
          }}
        >
          {selectedMessages?.messages?.[messageData.id] && (
            <IconButton className={classes.messageSelected}>
              <CheckIcon className={classes.messageSelectedIcon} />
            </IconButton>
          )}
        </div>
      )}
      <div
        className={classes.wrapperUp}
        style={{
          justifyContent: selfMessage ? "flex-end" : "flex-start",
        }}
        onContextMenu={(event: React.MouseEvent<HTMLElement>) => {
          dispatch(
            setContextMenuConfigAction({
              isShowMenu: true,
              messageId: 0,
              // config: [],
              config: config.selectedMessageContext(lang).filter((item) => {
                if (!selfMessage) {
                  return !item.self;
                }
                return true;
              }),
              callBackItem: handleClickContextMessage,
            })
          );
          contextMenu.show({
            id: eContextMenuId.main,
            event: event,
          });
          // dispatch(setSelectedChatsAction({ [data.conversationId]: data }));
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
          <div className={classesRootPaper} style={stylePaper}>
            {/* <div className={classes.paperSenderMessage}> */}
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
                      alignSelf: selfMessage ? "flex-end" : "flex-start",
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
