import { Messages } from '../../../../redux/conversations/constants/interfaces';

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
  handleSend: Function
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
  setAllMessages: Function
  allMessages: CurrentConversationMessages
  conversationId: number
  userId: number
  firstName: string
  opponentId: number
  openFileDialog: any
}

export interface DeleteMessageSocketResponse {
  conversationId: number
  messageId: number
}
