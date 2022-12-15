import React from "react";
import clsx from "clsx";
import { TextField } from "@mui/material";
import useStyles from "./styles";
import {
  socketEmitChatsTypingState,
  socketEmitSendMessage,
} from "../../../../../../config/socket/actions/socketEmit";
import languages from "../../../../../../config/translations";
import { fullDate } from "../../../../../../helpers";
import {
  editMessageAction,
  shareMessageAction,
} from "../../../../../../reduxToolkit/app/slice";
import RightInputComponent from "./components/RightInputComponent";
import LeftInputComponent from "./components/LeftInputComponent";
import MessageEdit from "./components/messageEdit";
import SharedMessages from "./components/sharedMessages";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";

// need ts
// rework

const MessageInput = ({ conversationId, userId, firstName, opponentId }) => {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
  const typing = useAppSelector(
    ({ conversationsSlice }) => conversationsSlice.conversationTypeState
  );
  const messageEdit = useAppSelector(({ appSlice }) => appSlice.messageEdit);
  const forwardMessages = useAppSelector(
    ({ appSlice }) => appSlice.forwardMessages
  );

  // STATES
  const [sheredMessages, setSharedMessages] = React.useState<any>([]);
  const [message, setMessage] = React.useState<any>({ 0: "" });

  // FUNCTIONS
  const handleChangeMessage = (e) => {
    setMessage({ ...message, [conversationId]: e.target.value });
    const user = {
      userId,
      firstName,
      conversationId,
      isTyping: false,
    };
    if (!typing[conversationId]) {
      socketEmitChatsTypingState(user, conversationId);
    } else {
      socketEmitChatsTypingState(user, null);
    }
  };

  const sendMessage = (id: any, messageSend: any, forwardedFromId: any) => {
    const body = {
      id,
      messageSend,
      forwardedFromId,
      opponentId,
      conversationId,
      setMessage,
    };
    socketEmitSendMessage(body);
  };

  const handleSendMessage = () => {
    if (!message[conversationId] && !sheredMessages.length) return;
    const messageSend: any = {
      message: message?.message || message[conversationId],
      fkSenderId: message?.User?.id || userId,
      messageType: "Text",
    };

    if (!conversationId) {
      return sendMessage(null, messageSend, null);
    }

    if (sheredMessages.length) {
      sheredMessages.map((message) => {
        const messageObj = {
          ...message,
        };
        sendMessage(conversationId, messageObj, message.User.id);
        return message;
      });
      dispatch(shareMessageAction([]));
    }
    if (message[conversationId]) {
      if (messageEdit.messageId) {
        sendMessage(conversationId, messageSend, null);
      } else {
        messageSend.sendDate = fullDate(new Date());
        sendMessage(conversationId, messageSend, null);
      }
    }
    messageEdit.messageId && clearMessageEdit();
  };

  const handleClearSharedMessages = () => {
    dispatch(shareMessageAction([]));
    setSharedMessages([]);
  };

  const clearMessageEdit = () => {
    dispatch(
      editMessageAction({
        message: {},
        messageId: null,
      })
    );
    setMessage((prev) => ({ ...prev, [conversationId]: "" }));
  };

  // USEEFFECTS
  React.useEffect(() => {
    setSharedMessages(forwardMessages);
  }, [forwardMessages]);

  React.useEffect(() => {
    messageEdit.messageId &&
      setMessage((prev) => ({
        ...prev,
        [conversationId]: messageEdit.message.message,
      }));

    return () => messageEdit.messageId && clearMessageEdit();
  }, [messageEdit.messageId]);

  return (
    <>
      <div className={classes.root}>
        {messageEdit.messageId ? (
          <MessageEdit data={messageEdit} onClose={clearMessageEdit} />
        ) : null}
        {forwardMessages.length ? (
          <SharedMessages
            forwardMessages={forwardMessages}
            handleClearSharedMessages={handleClearSharedMessages}
          />
        ) : null}
        <div
          className={clsx(classes.wrapperInput, {
            [classes.wrapperInputShadow]:
              messageEdit.messageId || forwardMessages.length,
          })}
        >
          <LeftInputComponent />
          <TextField
            // inputRef={ref}
            className={classes.input}
            value={message[conversationId] || ""}
            multiline={true}
            variant="standard"
            maxRows={4}
            onChange={handleChangeMessage}
            placeholder={`${languages[lang].generals.typeMessage}...`}
          />
          <RightInputComponent
            message={message[conversationId]}
            handleSendMessage={handleSendMessage}
            forwardMessages={forwardMessages}
          />
        </div>
      </div>
    </>
  );
};

export default MessageInput;
