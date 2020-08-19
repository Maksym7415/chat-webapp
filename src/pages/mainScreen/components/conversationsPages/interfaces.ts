export interface DialogProps {
  handleClose: Function
  handleSend: Function
  isOpen: boolean
  files: FileList | null
}

export interface AddFilesProps {
  files: FileList | null
  isOpen: boolean
  handleOpenDialog: Function
}
