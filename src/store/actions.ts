import { ACTION_SET_MESSAGES, ACTION_SET_ROOMS, ACTION_SET_SETTINGS } from '@/types/actions';
import {
  MUTATION_SET_MESSAGES, MUTATION_SET_ROOMS,
  MUTATION_SET_SETTINGS,
} from '@/types/mutations';
import { IStore } from '@/types/InterfaceStore';

/**
 * Интерфейс ответа беканда
 */
interface IResponse {
  result: unknown;
}

/**
 * Вызывает бекенд и обрабатывает результат
 * @param url
 * @param callback
 */
function fetchData(url: string, callback: (res: IResponse) => void): Promise<void> {
  return fetch(url)
    .then((stream) => stream.json())
    .then(callback);
}

const actions = {
  // action для получаения нового списка сообщений
  [ACTION_SET_MESSAGES](store: IStore, room: string): Promise<void> {
    return fetchData(`https://nane.tada.team/api/rooms/${room}/history`, (res) => {
      // обновляем список сообщений
      store.commit(MUTATION_SET_MESSAGES, res.result);
    });
  },
  // action для обновления списка комнат
  [ACTION_SET_ROOMS](store: IStore): Promise<void> {
    return fetchData('https://nane.tada.team/api/rooms', (res) => {
      // обновляем список комнат
      store.commit(MUTATION_SET_ROOMS, res.result);
    });
  },
  // action для получаения настроек
  [ACTION_SET_SETTINGS](store: IStore): Promise<void> {
    // получаем настройки
    return fetchData('https://nane.tada.team/api/settings', (res) => {
      store.commit(MUTATION_SET_SETTINGS, res.result);
    });
  },
};

export default actions;
