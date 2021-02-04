import { MessageFiles } from '../redux/common/interafaces';

export interface MessageSocketEmit {
  message?: {
    message: string | undefined
    sendDate?: string
    messageType: string
    meta?: Array<MessageFiles> | null
  }
  actionType: string

  conversationId?: number | undefined
  opponentId?: number
  userId: number
  messageId?: number | null
}
