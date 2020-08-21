import { v4 as uuidv4 } from 'uuid';
import { fullDate } from '../../../common/getCorrectDateFormat';

export const handleGetBufferFile = (fileReader: any, blob: any) => new Promise((resolve) => {
  fileReader.readAsArrayBuffer(blob);
  fileReader.onloadend = () => {
    let arrayBuffer = fileReader.result;

    resolve(arrayBuffer);
  };
});

export const handleEmitFilePartly = (file: any, fileSize: number, fileName: string, userId: number, conversationId: number, socket: any) => {
  const uniqueName = uuidv4();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < Math.ceil(fileSize / 10000); i++) {
    socket.emit('files', {
      data: file.slice(i * 10000, (i + 1) * 10000),
      uniqueName,
      fileName,
      sendDate: fullDate(new Date()),
      messageType: 'file',
      fkSenderId: userId,
      conversationId,
      fileSize,
      fileExtension: fileName.split('.')[fileName.split('.').length - 1],
    });
  }
};