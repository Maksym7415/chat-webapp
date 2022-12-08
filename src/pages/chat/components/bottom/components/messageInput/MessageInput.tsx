import React from "react";
import clsx from "clsx";
import { useParams, useLocation } from "react-router-dom";
import { TextField } from "@mui/material";
import useStyles from "./styles";
import { socket } from "../../../../../../config/socket";
import { socketEmitChatsTypingState } from "../../../../../../config/socket/actions/socketEmit";
import languages from "../../../../../../config/translations";
import { fullDate } from "../../../../../../helpers";
import {
  editMessageAction,
  shareMessageAction,
} from "../../../../../../reduxToolkit/app/slice";
import RightInputComponent from "./components/RightInputComponent";
import LeftInputComponent from "./components/LeftInputComponent";
import MessageEdit from "./components/messageEdit";
import SheredMessages from "./components/sheredMessages";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";

const MessageInput = React.forwardRef(
  ({ userId, firstName, opponentId }: any, ref: any) => {
    // HOOKS
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const params = useParams<any>();
    const location = useLocation<any>();

    // SELECTORS
    const lang = useAppSelector(({ settingSlice }) => settingSlice.lang);
    const conversationsList = useAppSelector(
      ({ conversationsSlice }) => conversationsSlice.conversationsList.data
    );
    const typing = useAppSelector(
      ({ conversationsSlice }) => conversationsSlice.conversationTypeState
    );
    const { messageEdit } = useAppSelector(({ appSlice }) => appSlice);
    const forwardMessages = useAppSelector(
      ({ appSlice }) => appSlice.sheraMessages
    );

    // STATES
    const [sheredMessages, setSheredMessages] = React.useState<any>([]);
    const [message, setMessage] = React.useState<any>({ 0: "" });
    const [visible, setVisible] = React.useState<any>(false);

    // VARIABLES
    const conversationId = React.useMemo(() => params?.id || 0, [params]);
    const conversationData: any = React.useMemo(
      () =>
        conversationsList?.[conversationId] ||
        location?.state?.conversationData ||
        {},
      [conversationsList, conversationId, location]
    );

    // FUNCTIONS
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

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
        socketEmitChatsTypingState(user);
      }
    };

    const socketSendMessageCommonFun = (
      id: any,
      messageSend: any,
      forwardedFromId: any
    ) =>
      socket.emit(
        "chats",
        {
          conversationId: id,
          message: messageSend,
          messageId: messageEdit.messageId,
          userId,
          opponentId,
          forwardedFromId: forwardedFromId || null,
        },
        (success) => {
          if (success) setMessage({ ...message, [conversationId]: "" });
        }
      );

    const handleSendMessage = () => {
      if (!message[conversationId] && !sheredMessages.length) return;
      const messageSend: any = {
        message: message?.message || message[conversationId],
        fkSenderId: message?.User?.id || userId,
        messageType: "Text",
      };

      if (!conversationId) {
        return socketSendMessageCommonFun(null, messageSend, null);
      }

      if (sheredMessages.length) {
        sheredMessages.map((message) => {
          const messageObj = {
            ...message,
          };
          socketSendMessageCommonFun(
            conversationId,
            messageObj,
            message.User.id
          );
          return message;
        });
        dispatch(shareMessageAction([]));
      }
      if (message[conversationId]) {
        if (messageEdit.messageId) {
          socketSendMessageCommonFun(conversationId, messageSend, null);
        } else {
          messageSend.sendDate = fullDate(new Date());
          socketSendMessageCommonFun(conversationId, messageSend, null);
        }
      }
      messageEdit.messageId && clearMessageEdit();
    };

    const handleClearSheraMessages = () => {
      dispatch(shareMessageAction([]));
      setSheredMessages([]);
      hideDialog();
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
      setSheredMessages(forwardMessages);
    }, [forwardMessages]);

    React.useEffect(
      React.useCallback(() => {
        messageEdit.messageId &&
          setMessage((prev) => ({
            ...prev,
            [conversationId]: messageEdit.message.message,
          }));

        return () => messageEdit.messageId && clearMessageEdit();
      }, [messageEdit.messageId]),
      []
    );

    return (
      <>
        <div className={classes.root} ref={ref}>
          {messageEdit.messageId ? (
            <MessageEdit data={messageEdit} onClose={clearMessageEdit} />
          ) : null}
          {forwardMessages.length ? (
            <SheredMessages
              forwardMessages={forwardMessages}
              handleClearSheraMessages={showDialog}
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
              // margin="dense"
              variant="standard"
              // keyboardType="default"
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
        {/* <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>
            {forwardMessages.length}{" "}
            {forwardMessages.length > 1 ? "Messages" : "Message"}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              What to do with {forwardMessages.length}{" "}
              {forwardMessages.length > 1 ? "messages" : "Message"} messages
              from your chat with {conversationData?.conversationName}?
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions
            style={{ flexDirection: "column", alignItems: "flex-end" }}
          >
            <Button onClick={hideDialog}>Show forwarding options</Button>
            <Button onClick={handleClearSheraMessages} color={"red"}>
              Cancel forwarding
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
      </>
    );
  }
);

export default MessageInput;
