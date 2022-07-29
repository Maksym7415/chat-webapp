/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { preloaderAction } from '../../../redux/common/commonActions';

export const handleGetBufferFile = (fileReader: any, blob: any, fileSize: number, fileName: string, userId: number, conversationId: number, socket: any, message: string, type: string, filesCount: number, dispatch: any, handleOpenDialog: Function, setSrc: Function, setMessage: Function, messageId: number, sendDate: any) => new Promise<void>((resolve) => {
  fileReader.readAsArrayBuffer(blob);
  fileReader.onloadend = () => {
    let arrayBuffer = fileReader.result;
    socket.emit('files', {
      data: arrayBuffer,
      uniqueName: uuidv4(),
      fileName,
      messageId,
      message,
      sendDate,
      userId,
      conversationId,
      fileSize,
      fileExtension: fileName.split('.')[fileName.split('.').length - 1],
      isImage: !!type.includes('image'),
      filesCount,
    }, (success: string) => {
      if (success === 'upload done') {
        handleOpenDialog(false);
        setSrc([]);
        setMessage('');
        dispatch(preloaderAction(false));
        return resolve();
      }
      resolve();
    });
  };
});
