/* eslint-disable @typescript-eslint/ban-types */
import { Messages, ConversationsList } from '../../redux/conversations/constants/interfaces';

// MAIN
export interface Conversation {
  [key: number]: User
}

export interface User {
  [key: number]: BackUsers
}

export interface BackUsers {
  firtsName: string
  isTyping: boolean
  userId: number
  conversationId: number
}

// USERCONVERSATIONHISTORY
export interface CurrentConversationMessages {
  [key: number]: Array<Messages>
}

export interface ScrollValue {
  [key: number]: number
}

export interface MessageValue {
  [key: number]: string
}

export interface Pagination {
  [key: number]: number
}

export interface Files {
  [key: string]: File
}

export interface FilesSrc {
  [key: string]: {
    file: string
    type: string
  }
}

// CHAT LIST
export type ChatListProps<T> = {
  data: Array<ConversationsList>
  usersTyping: Conversation
  history: T
};

// UPLOAD DIALOG
export interface DialogProps {
  handleClose: Function
  handleSend: Function
  isOpen: boolean
  files: Files | null
  handleAddFile: Function
  message: string
  src: FilesSrc | object
  setSrc: Function
  setMessage: Function
  setFiles: Function
}

// ADD FILES COMPONENT
export interface AddFilesProps {
  files: Files
  isOpen: boolean
  handleOpenDialog: Function
  handleAddFile: Function
  setFiles: Function
}

// MESSAGE COMPONENT
export interface MessageProps extends Messages {
  userId: number
  isShowAvatar?: boolean
  conversationId: number,
  allMassages: Array<Messages>
  isEditing: boolean,
}

// MESSAGEINPUT
export interface MessageInputProps<H> {
  setAllMessages: Function
  allMessages: CurrentConversationMessages
  conversationId: number
  userId: number
  firstName: string
  opponentId: number
  openFileDialog: any
  history: H
}

export interface DeleteMessageSocketResponse {
  conversationId: number
  messageId: number
}
