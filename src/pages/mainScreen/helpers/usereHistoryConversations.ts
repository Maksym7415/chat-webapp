import { Messages } from '../../../redux/conversations/constants/interfaces';

export function checkIsShowAvatar(array: Array<Messages>, fkSenderId: number, userId: number, index: number) {
  if (array[index + 1] && array[index + 1].fkSenderId === userId) return true;
  return false;
}
