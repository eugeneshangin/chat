import { IMessage } from './InterfaceMessage';
import { IRoom } from './InterfaceRoom';
import { ISettings } from './InterfaceSettings';

/**
 * Интерфейс для соккета
 */
interface ISocket {
  isConnected: boolean;
  message: string;
  reconnectError: boolean;
}

/**
 * Интерфейс стейта приложения
 */
export interface IState {
  selectedRoom: string;
  messages: IMessage[];
  socket: ISocket;
  rooms: IRoom[];
  settings: Partial<ISettings>;
}
