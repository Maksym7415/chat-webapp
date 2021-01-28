import { Messages } from '../../redux/conversations/constants/interfaces';

// MAIN
// export interface Conversation {
//   [key: number]: User
// }

// export interface User {
//   [key: number]: BackUsers
// }

// export interface BackUsers {
//   firtsName: string
//   isTyping: boolean
//   userId: number
//   conversationId: number
// }

export interface MessageSocketOn {
  message: Messages
  actionType: string
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

// UPLOAD DIALOG
export interface DialogProps {
  handleClose: Function
  isOpen: boolean
  files: Files | null
  handleAddFile: Function
  message: string
  src: FilesSrc | object
  setSrc: Function
  setMessage: Function
}

// ADD FILES COMPONENT
export interface AddFilesProps {
  files: Files
  isOpen: boolean
  handleOpenDialog: Function
  handleAddFile: Function
}

// MESSAGE COMPONENT
export interface MessageProps extends Messages {
  userId: number
  isShowAvatar?: boolean
}

// MESSAGEINPUT
export interface MessageInputProps {
  allMessages: CurrentConversationMessages
  conversationId: number
  userId: number
  firstName: string
  openFileDialog: any
  files: Files
  isOpenDialog: boolean
  handleOpenDialog: (isOpen: boolean) => void
}

export interface DeleteMessageSocketResponse {
  conversationId: number
  messageId: number
}
