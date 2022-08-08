import languages from '../../../../translations';

export default (lang: string, deleteChat: () => void, viewProfile: () => void, clearHistory: () => void) => [
  { id: 1, title: languages[lang].generals.viewProfile, callback: viewProfile },
  { id: 2, title: languages[lang].generals.deleteAndLeave, callback: deleteChat },
  { id: 3, title: languages[lang].generals.clearHistory, callback: clearHistory },
];
