export interface DialogProps {
  handleClose: Function
  handleSend: Function
  isOpen: boolean
  files: FileList | null
  handleAddFile: Function
}

export interface AddFilesProps {
  files: FileList | null
  isOpen: boolean
  handleOpenDialog: Function
  handleAddFile: Function
}
