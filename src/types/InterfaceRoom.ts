import { IMessage } from './InterfaceMessage';

/**
 * Интерфейс комнаты
 */
export interface IRoom {
  // eslint-disable-next-line camelcase
  last_message: IMessage;
  name: string;
  countNewMessage: number;
}
