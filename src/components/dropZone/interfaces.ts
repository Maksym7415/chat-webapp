export interface Props {
  name: string
  styles: string
  quantity: number
  type: string
  multiple: boolean
}

export interface DynamicFilesObjectKeys {
  [key: string]: {
    file: File
    src: string
  }
}
