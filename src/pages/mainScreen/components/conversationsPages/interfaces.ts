import { Messages } from '../../../../redux/conversations/constants/interfaces';
import { TokenPayload } from '../../../../redux/authorization/constants/interfaces';

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

// export type MessageProps = Messages & TokenPayload;

export interface MessageProps extends Messages {
  userId: number
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
