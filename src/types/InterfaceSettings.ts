/**
 * Интерфейс объекта настроек
 */
export interface ISettings {
  // eslint-disable-next-line camelcase
  max_message_length: number;
  // eslint-disable-next-line camelcase
  max_room_title_length: number;
  // eslint-disable-next-line camelcase
  max_username_length: number;
  uptime: number;
}
