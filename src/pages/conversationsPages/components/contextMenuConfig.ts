export default (isMyMessage: boolean, deleteMessage: any, editMessage: any) => {
  if (isMyMessage) {
    return [
      { id: 1, title: 'Delete Message', callback: deleteMessage },
      { id: 2, title: 'Edit Message', callback: editMessage },
      { id: 3, title: 'Share Message', callback: () => console.log('share message') },
    ];
  }
  return [
    { id: 3, title: 'Share Message', callback: () => console.log('share message') },
  ];
};
