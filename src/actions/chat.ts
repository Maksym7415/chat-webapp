import {
  setSelectedMessagesAction,
  setAllMessagesAction,
  editMessageAction,
  shareMessageAction,
} from "../reduxToolkit/app/slice";
import { actionsForTypeWithObjKey } from "../helpers/actionsForType";
import { socketEmitChatsDeleteMessage } from "../config/socket/actions/socketEmit";
import { actionsConversationList } from "./conversations";

// need ts

export const actionsSelectedMessages =
  (data, typeAction) => async (dispatch, getState) => {
    const { selectedMessages } = getState().appSlice;

    actionsForTypeWithObjKey({
      prevData: { ...selectedMessages },
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
};

export const actionsMessagesChat =
  (data, typeAction, navigation, additionalData) => (dispatch, getState) => {
    let messagesMass = [];

    switch (typeAction) {
      case actionsTypeActionsChat.deleteMessages:
        const getRemoveMessages = (conversationId, messageId) => {
          const allMessages = getState().appSlice.allMessages;
          const conversationsList =
            getState().conversationsSlice.conversationsList.data;

          // deleting a message from the message array
          let allMessagesWithoutDeleteMessage = allMessages[
            conversationId.toString()
          ]?.filter(
            (message) =>
              ![messageId?.toString()]?.includes(message?.id?.toString())
          );

          // check for the last element in the message array, if it is a date object, then delete it as well
          const updateAllMessages = allMessagesWithoutDeleteMessage[
            allMessagesWithoutDeleteMessage?.length - 1
          ]?.component
            ? allMessagesWithoutDeleteMessage.slice(0, -1)
            : allMessagesWithoutDeleteMessage;

          if (conversationsList[conversationId].Messages[0]?.id == messageId) {
            dispatch(
              actionsConversationList({
                mode: "updateMessageConversation",
                conversationId,
                messages: [updateAllMessages[updateAllMessages.length - 1]],
                conversationsList,
              })
            );
          }

          dispatch(
            setAllMessagesAction({
              [conversationId]: updateAllMessages,
            })
          );
        };

        // sorting through the selected messages and sending them through the socket and, if successful, delete them locally through the function - getRemoveMessages
        Object.keys(data.selectedMessages).map((messageId) => {
          socketEmitChatsDeleteMessage(
            {
              conversationId: data.conversationId,
              isDeleteMessage: true,
              messageId: +messageId,
            },
            () => {
              getRemoveMessages(data.conversationId, messageId);
            }
          );
        });
        return;
      case actionsTypeActionsChat.editMessage:
        Object.keys(data.selectedMessages).map((messageId) =>
          dispatch(
            editMessageAction({
              message: data.selectedMessages[messageId],
              messageId,
            })
          )
        );
        return;
      case actionsTypeActionsChat.copyMessage:
        messagesMass = Object.keys(data.selectedMessages).reduce(
          (acc, messageId) => {
            return [...acc, data.selectedMessages[messageId].message];
          },
          []
        );

        const CopyMessages = messagesMass.join("\n\n");
        // CopyMessages && Clipboard.setString(CopyMessages);

        // dispatch(
        //   getSnackBar({
        //     message: "",
        //     open: true,
        //     timeout: 6000,
        //     severity: "success",
        //     wrapperStyle: { bottom: "8%" },
        //     style: { alignItems: "center" },
        //     content: <TemplatesContent type={"copy"} />,
        //   })
        // );
        return;
      case actionsTypeActionsChat.forwardMessage:
        messagesMass = Object.keys(data.selectedMessages).reduce(
          (acc, messageId) => {
            const messageData = data.selectedMessages[messageId];
            return [
              ...acc,
              {
                Files: messageData.Files,
                User: messageData.User,
                fkSenderId: messageData.fkSenderId,
                id: messageData.id,
                isEditing: messageData.isEditing,
                message: messageData.message,
                sendDate: messageData.sendDate,
              },
            ];
          },
          []
        );

        dispatch(shareMessageAction(messagesMass));

        // navigation.navigate(PathsName.main, {
        //   typeAction: "forwardMessage",
        //   additionalData,
        // });

        return;
      default:
        return;
    }
  };
