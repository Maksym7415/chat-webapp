export interface User {
  [key: number]: BackUsers;
}

export interface BackUsers {
  firtsName: string;
  isTyping: boolean;
  userId: number;
  conversationId: number;
}

export interface UserInfoSuccess {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  tagName: string;
  fullName: string;
  status: string;
  userAvatar: string;
  userCreationTime: string;
  userUpdateTime: string;
  userLastTimeOnline: string;
  Roles: Array<Roles>;
}

interface Roles {
  id: number;
  name: string;
  description: string;
}

// interface UserCreateConversationSuccess {
//   data: Array<ResponseCreateConversation>;
// }

// interface UserCreateConversation {
//   success: UserCreateConversationSuccess;
//   error: ErrorResponse;
// }
