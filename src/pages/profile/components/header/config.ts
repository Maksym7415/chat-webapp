// show:
// 1 - general actions
// 2 - when a photo is open
// 3 - when no photo is open

export const valuesOptions = {
  edit: "edit",
  insertPhotoVideo: "insertPhotoVideo",
  saveToGallery: "saveToGallery",
  removePhoto: "removePhoto",
  logout: "logout",
  searchForParticipants: "searchForParticipants",
  deleteLeaveGroup: "deleteLeaveGroup",
  addToHomeScreen: "addToHomeScreen",
  shareContact: "shareContact",
  toBlock: "toBlock",
  editContact: "editContact",
  deleteAContact: "deleteAContact",
  startASecretChat: "startASecretChat",
};

const saveToGallery = (lang) => ({
  title: "Save to gallery",
  value: valuesOptions.saveToGallery,
  show: 2,
  icon: {
    name: "svgs_line_download",
  },
  noFunctional: true,
});

const addToHomeScreen = (lang) => ({
  title: "Add to home screen",
  value: valuesOptions.addToHomeScreen,
  show: 1,
  icon: {
    name: "svgs_line_create_shortcut",
  },
  noFunctional: true,
});

const deleteLeaveGroup = (lang) => ({
  title: "Delete and leave the group",
  value: valuesOptions.deleteLeaveGroup,
  show: 1,
  icon: {
    name: "svgs_line_logOut",
  },
  noFunctional: true,
});

export const headerOptions = (lang) => [
  {
    id: 1,
    title: "Edit",
    value: valuesOptions.edit,
    show: 1,
    icon: {
      name: "svgs_line_pencil",
    },
  },
  {
    id: 2,
    title: "Insert photo/video",
    value: valuesOptions.insertPhotoVideo,
    show: 1,
    icon: {
      name: "svgs_line_camera_add",
    },
  },
  {
    ...saveToGallery(lang),
    id: 3,
  },
  {
    id: 4,
    title: "Remove",
    value: valuesOptions.removePhoto,
    show: 2,
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
  },
  {
    id: 5,
    title: "Logout",
    value: valuesOptions.logout,
    show: 3,
    icon: {
      name: "svgs_line_logOut",
    },
  },
];

export const headerOptionsChat = (lang) => [
  {
    id: 1,
    title: "Search for participants",
    value: valuesOptions.searchForParticipants,
    show: 1,
    icon: {
      name: "svgs_line_search",
    },
    noFunctional: true,
  },
  {
    ...deleteLeaveGroup(lang),
    id: 2,
  },
  {
    ...addToHomeScreen(lang),
    id: 3,
  },
  {
    ...saveToGallery(lang),
    id: 4,
  },
];

export const headerOptionsGroup = (lang) => [
  {
    ...deleteLeaveGroup(lang),
    id: 1,
  },
  {
    ...addToHomeScreen(lang),
    id: 3,
  },
  {
    ...saveToGallery(lang),
    id: 4,
  },
];

export const headerOptionsDialog = (lang) => [
  {
    id: 1,
    title: "Share contact",
    value: valuesOptions.shareContact,
    show: 1,
    icon: {
      name: "svgs_line_share",
    },
    noFunctional: true,
  },
  {
    id: 2,
    title: "To block",
    value: valuesOptions.toBlock,
    show: 1,
    icon: {
      name: "svgs_line_block",
    },
    noFunctional: true,
  },
  {
    id: 3,
    title: "Edit contact",
    value: valuesOptions.editContact,
    show: 1,
    icon: {
      name: "svgs_line_pencil",
    },
    noFunctional: true,
  },
  {
    id: 4,
    title: "Delete a contact",
    value: valuesOptions.deleteAContact,
    show: 1,
    icon: {
      name: "svgs_line_trash_bin_alt",
    },
    noFunctional: true,
  },
  {
    id: 5,
    title: "Start a secret chat",
    value: valuesOptions.startASecretChat,
    show: 1,
    icon: {
      name: "svgs_line_lock",
    },
    noFunctional: true,
  },
  {
    ...addToHomeScreen(lang),
    id: 6,
  },
  {
    ...saveToGallery(lang),
    id: 7,
  },
];
