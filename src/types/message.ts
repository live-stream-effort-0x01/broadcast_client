export interface MessageArg {
  username: string;
  content: string;
}

export enum MessageType {
  SEND,
  RECEIVE,
  ADMIN,
  ERROR,
  SPECIAL_REQUEST,
}

export interface Message {
  content: MessageArg;
  type: MessageType;
}
