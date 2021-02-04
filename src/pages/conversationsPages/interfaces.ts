import { Dispatch, SetStateAction } from 'react';
import { Messages } from '../../redux/conversations/constants/interfaces';

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
  handleClose: (isOpen: boolean) => void
  isOpen: boolean
  files: Files | null
  handleAddFile: () => void
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  setSrc: Dispatch<SetStateAction<FilesSrc | object>>
  src: FilesSrc | object
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
  opponentId: number
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
