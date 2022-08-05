export default (isMyMessage: boolean, deleteMessage: any, editMessage: any, shareMessage: any) => {
  if (isMyMessage) {
    return [
      { id: 1, title: 'Delete Message', callback: deleteMessage },
      { id: 2, title: 'Edit Message', callback: editMessage },
      { id: 3, title: 'Share Message', callback: shareMessage },
    ];
  }
  return [
    { id: 3, title: 'Share Message', callback: shareMessage },
  ];
};
