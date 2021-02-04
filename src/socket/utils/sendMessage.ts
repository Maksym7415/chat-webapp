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
  opponentId?: number
  userId: number
  message: MessageValue
  messageDialog?: string | undefined
  messageId: number | null
  messageType: string
  successCallback: (success: boolean, actionType: string) => void

}

function sendMessage({
  actionType, chatId, message, messageDialog, userId, opponentId, messageId, successCallback, messageType, meta,
}: MessageParams) {
  function emit(emitData: MessageSocketEmit) {
    socket.emit('message', emitData, successCallback);
  }
  console.log(message);
  const emitData: MessageSocketEmit = {
    conversationId: isNaN(chatId) ? 0 : chatId,
    actionType,
    userId,
    opponentId,
  };
  switch (actionType) {
    case 'new': {
      if (messageType === 'File') {
        return emit({
          ...emitData,
          actionType,
          message: {
            message: messageDialog, sendDate: fullDate(new Date()), messageType, meta,
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
