import { Messages } from '../../../../redux/conversations/constants/interfaces';

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

export interface Files {
  [key: string]: File
}

export interface FilesSrc {
  [key: string]: {
    file: string
    type: string
  }
}

export interface AddFilesProps {
  files: Files
  isOpen: boolean
  handleOpenDialog: Function
  handleAddFile: Function
}

export interface MessageProps extends Messages {
  userId: number
  isShowAvatar?: boolean
}

export interface MessageInputProps {
  setAllMessages: Function
  allMessages: CurrentConversationMessages
  conversationId: number
  userId: number
  firstName: string
  opponentId: number
  openFileDialog: any
}

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

// MESSAGEINPUT
export interface DeleteMessageSocketResponse {
  conversationId: number
  messageId: number
}
