import { v4 as uuidv4 } from 'uuid';
import { Func } from 'mocha';
import { fullDate } from '../../../common/getCorrectDateFormat';
import { preloaderAction } from '../../../redux/common/commonActions';

export const handleGetBufferFile = (fileReader: any, blob: any) => new Promise((resolve) => {
  fileReader.readAsArrayBuffer(blob);
  fileReader.onloadend = () => {
    let arrayBuffer = fileReader.result;

    resolve(arrayBuffer);
  };
});

export const handleEmitFilePartly = (file: any, fileSize: number, fileName: string, userId: number, conversationId: number, socket: any, message: string, type: string, filesCount: number, dispatch: any, handleOpenDialog: Function, setSrc: Function, setMessage: Function) => {
  const uniqueName = uuidv4();
  const iterations = Math.ceil(fileSize / 10000);
  for (let i = 0; i < iterations; i++) {
    socket.emit('files', {
      data: file.slice(i * 10000, (i + 1) * 10000),
      uniqueName,
      fileName,
      sendDate: fullDate(new Date()),
      messageType: 'file',
      message: {
        message,
        fkSenderId: userId,
        sendDate: fullDate(new Date()),
        messageType: 'Text',
      },
      userId,
      conversationId,
      fileSize,
      fileExtension: fileName.split('.')[fileName.split('.').length - 1],
      isImage: !!type.includes('image'),
      iterations,
      filesCount,
    }, (success: boolean) => {
      if (success) {
        handleOpenDialog(false);
        setSrc([]);
        setMessage('');
        dispatch(preloaderAction(false));
      }
    });
  }
};
