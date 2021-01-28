export interface MessageSocketEmit {
  message?: {
    message: string
    sendDate?: string
    messageType: string
  }
  actionType: string
  conversationId: number | undefined
  userId: number
  messageId?: number | null
}
