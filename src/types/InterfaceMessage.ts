export interface ISender {
  username: string;
}

export interface IMessage {
  text: string;
  sender: ISender;
  created: string;
}
