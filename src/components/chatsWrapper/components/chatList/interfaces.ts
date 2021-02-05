// CHAT LIST
export interface Conversation {
  [key: number]: User
}

export interface User {
  [key: number]: BackUsers
}

export interface BackUsers {
  firstName: string
  isTyping: boolean
  userId: number
  conversationId?: number
}
