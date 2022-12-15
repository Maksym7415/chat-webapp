import store from "../reduxToolkit/store";
import {
  socketEmitDeleteConversation,
  socketEmitClearConversation,
} from "../config/socket/actions/socketEmit";
import { Paths } from "../routing/config/paths";
import { updateConversationListAction } from "../reduxToolkit/conversations/slice";

export const actionsConversationList = (data) => (dispatch) => {
  switch (data.mode) {
    case "updateMessageConversation":
      return dispatch(
        updateConversationListAction({
          [data.conversationId]: {
            ...data.conversationsList[data.conversationId],
            Messages: data.messages,
          },
        })
      );
    default:
      return null;
  }
};

export const actionsTypeActionsConversation = {
  deleteChat: "deleteChat",
  clearChat: "clearChat",
};

export const actionsSelectedConversation = (props) => {
  const selectedChats = store.getState().appSlice.selectedChats;

  const { typeAction, dataConversation = null } = props;

  console.log(props);
  let _conversations = {};

  if (Object.keys(selectedChats).length) {
    _conversations = selectedChats;
  } else {
    if (dataConversation) {
      _conversations = {
        [dataConversation.conversationId]: dataConversation,
      };
    } else {
      return alert("Something error actionsSelectedConversation");
    }
  }

  switch (typeAction) {
    case actionsTypeActionsConversation.deleteChat:
      // for ids
      socketEmitDeleteConversation({
        ids: Object.keys(_conversations),
      });

      return;
    case actionsTypeActionsConversation.clearChat:
      // for ids
      socketEmitClearConversation({
        ids: Object.keys(_conversations),
      });
      return;
    default:
      return;
  }
};

export const actionCreateNewConversation = (history, item) => {
  const conversationsList =
    store.getState().conversationsSlice.conversationsList.data;

  const chat: any = Object.values(conversationsList).find(
    (el: any) => el.conversationName === item.fullName
  );

  if (chat) {
    return history.push(`${Paths.chat}/${chat.conversationId}`, {
      id: chat.conversationId,
      conversationData: chat,
    });
  }

  return history.push(Paths.newChat, {
    conversationData: {
      conversationAvatar: item.userAvatar,
      conversationName: item.fullName,
      conversationType: "dialog",
    },
    opponentId: item.id,
  });
};
