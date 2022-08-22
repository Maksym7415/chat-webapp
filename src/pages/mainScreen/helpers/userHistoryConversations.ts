/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-expressions */
import { v4 as uuidv4 } from 'uuid';
import { Messages } from '../../../redux/conversations/constants/interfaces';
import { Files } from '../interfaces';

export function checkIsShowAvatar(array: Array<Messages>, userId: number, index: number) {
  if (array[index].forwardedUser) return false;
  if (array[index].fkSenderId !== userId) return true;
  return false;
}

export const scrollTop = (ref: any) => {
  let element = document.getElementById('messages');
  element?.scrollTo({
    top: 10,
    behavior: 'smooth',
  });
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
