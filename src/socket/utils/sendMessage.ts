import { fullDate } from '../../common/getCorrectDateFormat';
import { socket } from '..';
import { MessageSocketEmit } from '../interfaces';
import { MessageValue } from '../../pages/conversationsPages/interfaces';
import { MessageFiles } from '../../redux/common/interafaces';

interface MessageParams {
  chatId: number
  actionType: string
  // setMessage: () => void
  // editMessageAction: () => void
  meta?: Array<MessageFiles>
  userId: number
  message: MessageValue
  messageId: number | null
  messageType: string
  successCallback: (success: boolean, actionType: string) => void

}

function sendMessage({
  actionType, chatId, message, userId, messageId, successCallback, messageType, meta,
}: MessageParams) {
  function emit(emitData: MessageSocketEmit) {
    socket.emit('message', emitData, successCallback);
  }
  console.log(message);
  const emitData: MessageSocketEmit = {
    conversationId: chatId,
    actionType,
    userId,
  };
  switch (actionType) {
    case 'new': {
      if (messageType === 'File') {
        return emit({
          ...emitData,
          actionType,
          message: {
            message: message[chatId], sendDate: fullDate(new Date()), messageType, meta,
          },
        });
      }
      return emit({
        ...emitData,
        actionType,
        message: {
          message: message[chatId], sendDate: fullDate(new Date()), messageType,
        },
      });
    }
    case 'edit': {
      return emit({
        ...emitData,
        message: {
          message: message[chatId], messageType,
        },
        messageId,
      });
    }
    case 'delete': {
      return emit({
        ...emitData,
        messageId,
      });
    }
    default:
  }
}

export default sendMessage;
