import { actionsTypeActionsChat } from "../../../../actions";

export const headerSelectedChatsAmount = (lang) => [
  {
    id: 1,
    title: "Edit",
    value: actionsTypeActionsChat.editMessage,
    icon: {
      name: "svgs_line_pencil",
    },
  },
  {
    id: 2,
    title: "Copy",
    value: actionsTypeActionsChat.copyMessage,
    icon: {
      name: "svgs_line_copy",
    },
  },
  {
    id: 3,
    title: "Forward",
    value: actionsTypeActionsChat.forwardMessage,
    icon: {
      name: "svgs_line_forward",
    },
  },
  {
    id: 4,
    title: "Del",
    value: actionsTypeActionsChat.deleteMessages,
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
  },
];

const headerChatDotsOptionsDialogSubNotify = (lang, levelNames) => [
  {
    id: 1,
    title: "Do not notify",
    value: "notify",
    icon: {
      name: "svgs_line_pin",
    },
    noFunctional: true,
  },
  {
    id: 2,
    title: "Video call",
    value: "videoCall",
    icon: {
      name: "svgs_line_videocall",
    },
    noFunctional: true,
  },
  {
    id: 3,
    title: "search",
    value: "search",
    icon: {
      name: "svgs_line_clear",
    },
    noFunctional: true,
  },
];

export const headerChatDotsOptionsDialog = (lang) => [
  {
    id: 1,
    title: "Do not notify",
    value: "DoNotNotify",
    icon: {
      name: "svgs_line_volume",
    },
    subMenu: headerChatDotsOptionsDialogSubNotify(lang, "notify"),
    levelNames: "notify",
  },
  {
    id: 2,
    title: "Video call",
    value: "videoCall",
    icon: {
      name: "svgs_line_videocall",
    },
    noFunctional: true,
  },
  {
    id: 3,
    title: "Search",
    value: "search",
    icon: {
      name: "svgs_line_search",
    },
    noFunctional: true,
  },
  {
    id: 4,
    title: "Clear history",
    value: "clearHistory",
    icon: {
      name: "svgs_line_clear",
    },
    noFunctional: true,
  },
  {
    id: 5,
    title: "Remove Chat",
    value: "removeChat",
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
    noFunctional: true,
  },
];

export const headerChatDotsOptionsChat = (lang) => [
  {
    id: 1,
    title: "Do not notify",
    value: "DoNotNotify",
    icon: {
      name: "svgs_line_volume",
    },
    subMenu: headerChatDotsOptionsDialogSubNotify(lang, "notify"),
    levelNames: "notify",
  },
  {
    id: 2,
    title: "Search",
    value: "search",
    icon: {
      name: "svgs_line_search",
    },
    noFunctional: true,
  },
  {
    id: 3,
    title: "To complain",
    value: "toComplain",
    icon: {
      name: "svgs_line_report",
    },
    noFunctional: true,
  },
  {
    id: 4,
    title: "Clear history",
    value: "clearHistory",
    icon: {
      name: "svgs_line_clear",
    },
    noFunctional: true,
  },
  {
    id: 5,
    title: "Delete and leave the group",
    value: "removeChat",
    icon: {
      name: "svgs_line_logOut",
    },
    noFunctional: true,
  },
];
