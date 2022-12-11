import { Paths } from "../../routing/config/paths";
import { IListItem } from "../../ts/interfaces/app";

export const settingsList = (lang: string): IListItem[] => [
  {
    id: 1,
    title: "Notifications and Sounds",
    path: Paths.main,
    icon: {
      name: "svgs_line_bell",
    },
    disabled: true,
  },
  {
    id: 2,
    title: "Privacy and Security",
    path: Paths.main,
    icon: {
      name: "svgs_line_lock",
    },
    disabled: true,
  },
  {
    id: 3,
    title: "Data and Storage",
    path: Paths.main,
    icon: {
      name: "svgs_line_data",
    },
    disabled: true,
  },
  {
    id: 4,
    title: "Chat Settings",
    path: Paths.main,
    icon: {
      name: "svgs_line_chat",
    },
    disabled: true,
  },
  {
    id: 5,
    title: "Folders",
    path: Paths.main,
    icon: {
      name: "svgs_line_folder",
    },
    disabled: true,
  },
  {
    id: 6,
    title: "Devices",
    path: Paths.main,
    icon: {
      name: "svgs_line_devices",
    },
    disabled: true,
  },
  {
    id: 7,
    title: "Language",
    path: Paths.main,
    icon: {
      name: "svgs_line_language",
    },
    disabled: true,
  },
];

export const helpsList = (lang) => [
  {
    id: 1,
    title: "Ask a Question",
    value: "AskAQuestion",
    icon: {
      name: "svgs_line_chat",
    },
    disabled: true,
  },
  {
    id: 2,
    title: "Telegram FAQ",
    value: "telegramFAQ ",
    icon: {
      name: "svgs_line_faq",
    },
    disabled: true,
  },
  {
    id: 3,
    title: "Privacy Policy ",
    value: "privacyPolicy  ",
    icon: {
      name: "svgs_line_sheild",
    },
    disabled: true,
  },
];

export const handleInsertPhotoVideo = (refBottomSheet) => {
  refBottomSheet.current?.snapToIndex(0);
};
