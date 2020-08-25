import { Func } from 'mocha';

export interface DialogProps {
  handleClose: Function
  handleSend: Function
  isOpen: boolean
  files: FileList | null
  handleAddFile: Function
  message: string
  src: Array<string | ArrayBuffer | null>
  setSrc: Function
  setMessage: Function
}

export interface AddFilesProps {
  files: FileList | null
  isOpen: boolean
  handleOpenDialog: Function
  handleAddFile: Function
}
