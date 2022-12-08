import store from "../../reduxToolkit/store";
import { Paths } from "../../routing/config/paths";

export const actionCreateNewChat = (history, item) => {
  const conversationsList =
    store.getState().conversationsSlice.conversationsList.data;

  const chat = Object.values(conversationsList).find(
    (el) => el.conversationName === item.fullName
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
