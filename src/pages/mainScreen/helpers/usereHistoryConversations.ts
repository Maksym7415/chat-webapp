import { Messages } from '../../../redux/conversations/constants/interfaces';

export function checkIsShowAvatar(array: Array<Messages>, fkSenderId: number, userId: number, index: number) {
  if (array[index + 1] && array[index + 1].fkSenderId === userId) return true;
  return false;
}

export const scrollTop = (ref: any, mainGrid: any, offset: number, position: number, isScrollTo: boolean) => {
  if (isScrollTo) {
    return mainGrid.scrollTo({
      top: position + ref.current?.offsetHeight,
      behavior: 'smooth',
    });
  }
  if (position === 0 && offset !== 0) {
    return mainGrid.scrollTo({
      top: position || 10,
      behavior: 'smooth',
    });
  }

  ref.current?.scrollIntoView({ behavior: 'smooth' });
};
