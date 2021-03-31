import { IMessage } from './InterfaceMessage';
import { IRoom } from './InterfaceRoom';
import { ISettings } from './InterfaceSettings';

interface ISocket {
  isConnected: boolean;
  message: string;
  reconnectError: boolean;
}

export interface IState {
  selectedRoom: string;
  messages: IMessage[];
  socket: ISocket;
  rooms: IRoom[];
  settings: Partial<ISettings>;
}
