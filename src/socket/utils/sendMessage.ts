import { fullDate } from '../../common/getCorrectDateFormat';
import { socket } from '..';
import { MessageSocketEmit } from '../interfaces';
import { MessageValue } from '../../pages/mainScreen/interfaces';

interface MessageParams {
  chatId: number
  actionType: string
  // setMessage: () => void
  // editMessageAction: () => void
  userId: number
  message: MessageValue
  messageId: number | null
  successCallback: (success: boolean, actionType: string) => void

}

function sendMessage({
  actionType, chatId, message, userId, messageId, successCallback,
} : MessageParams) {
  function emit(emitData: MessageSocketEmit) {
    socket.emit('message', emitData, successCallback);
  }

  const emitData: MessageSocketEmit = {
    conversationId: chatId,
    actionType,
    userId,
  };
  switch (actionType) {
    case 'new': {
      return emit({
        ...emitData,
        actionType,
        message: {
          message: message[chatId], sendDate: fullDate(new Date()), messageType: 'Text',
        },
      });
    }
    case 'edit': {
      return emit({
        ...emitData,
        message: {
          message: message[chatId], messageType: 'Text',
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
