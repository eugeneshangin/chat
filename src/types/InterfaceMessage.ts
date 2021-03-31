/**
 * Интерфес объекта отправившего сообщение
 */
export interface ISender {
  username: string;
}

/**
 * Интерфейс собщения
 */
export interface IMessage {
  text: string;
  sender: ISender;
  created: string;
}

/**
 * Интерфейс сообщения пришедшего по ws
 */
export interface IDataMessage extends IMessage {
  room: string;
}

/**
 * Интерфейс data в ws
 */
export interface IWSMessage {
  data: string;
}
