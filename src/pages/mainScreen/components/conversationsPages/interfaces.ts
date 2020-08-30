import { Func } from 'mocha';

export interface DialogProps {
  handleClose: Function
  handleSend: Function
  isOpen: boolean
  files: Array<File> | null
  handleAddFile: Function
  message: string
  src: Array<string | ArrayBuffer | null>
  setSrc: Function
  setMessage: Function
}

export interface AddFilesProps {
  files: Array<File> | null
  isOpen: boolean
  handleOpenDialog: Function
  handleAddFile: Function
}
