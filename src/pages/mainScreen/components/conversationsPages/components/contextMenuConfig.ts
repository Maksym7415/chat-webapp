import languages from '../../../../../translations';

export default (lang: string, isMyMessage: boolean, deleteMessage: any, editMessage: any, shareMessage: any) => {
  if (isMyMessage) {
    return [
      { id: 1, title: languages[lang].generals.deleteMessage, callback: deleteMessage },
      { id: 2, title: languages[lang].generals.editMessage, callback: editMessage },
      { id: 3, title: languages[lang].generals.shareMessage, callback: shareMessage },
    ];
  }
  return [
    { id: 3, title: languages[lang].generals.shareMessage, callback: shareMessage },
  ];
};
