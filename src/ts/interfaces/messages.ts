import { User } from "./users";

export interface Messages {
  User: User;
  message: string;
  fkSenderId: number;
  id: number;
  sendDate: string;
  messageType?: string;
  //   Files: Array<FileData>;
  isEditing: boolean;
  isEdit: boolean;
  component?: object;
  forwardedUser: any | null;
}
