import {
  setSelectedMessagesAction,
  setAllMessagesAction,
  editMessageAction,
  shareMessageAction,
  setDialogConfigAction,
} from "../reduxToolkit/app/slice";
import { actionsForTypeWithObjKey } from "../helpers/actionsForType";
import Snackbar from "../helpers/notistack";
import { socketEmitChatsDeleteMessage } from "../config/socket/actions/socketEmit";
import { getSnackBar } from "../components/snackbar/slice";
import { actionsConversationList } from "./conversations";
import store from "../reduxToolkit/store";

// need ts

export const actionsTypeObject = {
  add: "add",
  remove: "remove",
  clear: "clear",
};

export const actionsSelectedMessages =
  (data, typeAction) => async (dispatch, getState) => {
    const { selectedMessages } = getState().appSlice;

    const copySelectedMessages = { ...selectedMessages.messages };

    switch (typeAction) {
      case actionsTypeObject.add:
        dispatch(
          setSelectedMessagesAction({
            ...selectedMessages,
            messages: {
              ...copySelectedMessages,
              [data?.id]: data,
            },
          })
        );
        return null;
      case actionsTypeObject.remove:
        delete copySelectedMessages[data?.id];
        console.log(copySelectedMessages, "copySelectedMessages");
        const active = Object.keys(copySelectedMessages).length ? true : false;
        dispatch(
          setSelectedMessagesAction({
            ...selectedMessages,
            active,
            messages: {
              ...copySelectedMessages,
            },
          })
        );
        return;
      case actionsTypeObject.clear:
        // isDispatch ? props.dispatch(props.setAction({})) : props.setAction({});
        return {};
      default:
        return;
    }
    actionsForTypeWithObjKey({
      prevData: { ...selectedMessages },
      prevDataKey: { ...selectedMessages.messages },
      key: data?.id || null,
      data,
      typeAction,
      dispatch: dispatch,
      setAction: setSelectedMessagesAction,
    });
  };

export const actionsTypeActionsChat = {
  deleteMessages: "deleteMessages",
  editMessage: "editMessage",
  copyMessage: "copyMessage",
  forwardMessage: "forwardMessage",
  replyMessage: "replyMessage",
  selectMessages: "selectMessages",
};

export const actionsMessagesChat = (props: any) => {
  const selectedMessages = store.getState().appSlice.selectedMessages;

  const { conversationId, typeAction, messageData = null } = props;

  let _messages = {};

  let messagesMass = [];

  if (Object.keys(selectedMessages.messages).length) {
    _messages = selectedMessages.messages;
  } else {
    if (messageData) {
      _messages = {
        [messageData.id]: messageData,
      };
    }
    if (!actionsTypeActionsChat.selectMessages === typeAction) {
      return alert("Something error actionsMessagesChat");
    }
  }

  switch (typeAction) {
    // DELETE MESSAGE
    case actionsTypeActionsChat.deleteMessages:
      const getRemoveMessages = (conversationId, messageId) => {
        const allMessages = store.getState().appSlice.allMessages;
        const conversationsList =
          store.getState().conversationsSlice.conversationsList.data;

        // deleting a message from the message array
        let allMessagesWithoutDeleteMessage = allMessages[
          conversationId
        ]?.filter(
          (message) =>
            ![messageId?.toString()]?.includes(message?.id?.toString())
        );

        // check for the last element in the message array, if it is a date object, then delete it as well
        const checkIsLastDateComponent = (array) => {
          const arrayLength = array.length - 1;

          if (array?.[arrayLength]?.component) {
            return checkIsLastDateComponent(array.slice(0, arrayLength));
          }

          return array;
        };

        const updateAllMessages = checkIsLastDateComponent(
          allMessagesWithoutDeleteMessage
        );

        if (conversationsList[conversationId].Messages[0]?.id == messageId) {
          store.dispatch(
            actionsConversationList({
              mode: "updateMessageConversation",
              conversationId,
              messages: updateAllMessages,
              conversationsList,
            })
          );
        }

        store.dispatch(
          setAllMessagesAction({
            [conversationId]: updateAllMessages,
          })
        );
      };

      // sorting through the selected messages and sending them through the socket and, if successful, delete them locally through the function - getRemoveMessages
      return Object.keys(_messages).map((messageId) => {
        socketEmitChatsDeleteMessage(
          {
            conversationId,
            isDeleteMessage: true,
            messageId: +messageId,
          },
          () => {
            getRemoveMessages(conversationId, messageId);
          }
        );
      });

    // EDIT MESSAGE
    case actionsTypeActionsChat.editMessage:
      return Object.keys(_messages).map((messageId) =>
        store.dispatch(
          editMessageAction({
            message: _messages[messageId],
            messageId,
          })
        )
      );

    // COPY MESSAGE
    case actionsTypeActionsChat.copyMessage:
      messagesMass = Object.keys(_messages).reduce((acc, messageId) => {
        return [...acc, _messages[messageId].message];
      }, []);

      const CopyMessages = messagesMass.join("\n\n");
      // CopyMessages && Clipboard.setString(CopyMessages);

      if (CopyMessages) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(CopyMessages);
        } else alert("Ваш браузер не підтримує Clipboard");
      }

      return Snackbar.success("Copy");

    // SELECT MESSAGES
    case actionsTypeActionsChat.selectMessages:
      return store.dispatch(
        setSelectedMessagesAction({
          active: true,
          messages: _messages,
        })
      );

    // FORWARD MESSAGES
    case actionsTypeActionsChat.forwardMessage:
      messagesMass = Object.keys(_messages).reduce((acc, messageId) => {
        const messageData = _messages[messageId];
        acc.push({
          Files: messageData.Files,
          User: messageData.User,
          fkSenderId: messageData.fkSenderId,
          id: messageData.id,
          isEditing: messageData.isEditing,
          message: messageData.message,
          sendDate: messageData.sendDate,
        });
        return acc;
      }, []);

      return store.dispatch(
        setDialogConfigAction({
          open: true,
          typeContent: "shareMessage",
          title: "Share Message",
          data: messagesMass,
        })
      );

    default:
      return Snackbar.error("An unknown action in chat is selected");
  }
};
