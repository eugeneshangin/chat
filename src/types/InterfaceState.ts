import { IMessage } from './InterfaceMessage';

export interface IState {
  selectedRoom: string;
  messages: IMessage[];
}
