export interface ISender {
  username: string;
}

export interface IMessage {
  text: string;
  sender: ISender;
  created: string;
}

export interface IDataMessage extends IMessage {
  room: string;
}

export interface IWSMessage {
  data: string;
}
