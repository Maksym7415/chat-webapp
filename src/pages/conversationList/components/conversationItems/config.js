import { actionsTypeActionsConversation } from "../../../../reduxToolkit/app/actions";
import languages from "../../../../config/translations";

export const selectedConversationContext = (lang) => [
  {
    id: 3,
    title: languages[lang].generals.deleteAndLeave,
    value: actionsTypeActionsConversation.deleteChat,
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
  },
  {
    id: 4,
    title: languages[lang].generals.clearHistory,
    value: actionsTypeActionsConversation.clearChat,
    icon: {
      name: "svgs_line_clear",
    },
  },
];
