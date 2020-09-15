export default (deleteChat: any) => [
  { id: 1, title: 'View Profile', callback: () => console.log('view profile') },
  { id: 2, title: 'Delete and leave', callback: deleteChat },
  { id: 3, title: 'Clear history', callback: () => console.log('clear history') },
];
