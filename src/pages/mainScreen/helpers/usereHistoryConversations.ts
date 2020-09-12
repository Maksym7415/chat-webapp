/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { v4 as uuidv4 } from 'uuid';
import { Messages } from '../../../redux/conversations/constants/interfaces';
import { Files } from '../components/conversationsPages/interfaces';

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

export function settingFilesObject(file: FileList | null, setFiles: Function) {
  const result: Files = {};
  if (file && file.length) {
    Object.values(file).forEach((element) => {
      const key = uuidv4();
      result[key] = element;
    });
  }
  setFiles((prev: Files) => ({ ...prev, ...result }));
}
