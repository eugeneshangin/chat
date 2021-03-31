import { ACTION_SET_MESSAGES, ACTION_SET_ROOMS, ACTION_SET_SETTINGS } from '@/types/actions';
import {
  MUTATION_SET_MESSAGES, MUTATION_SET_ROOMS,
  MUTATION_SET_SETTINGS,
} from '@/types/mutations';
import { IStore } from '@/types/InterfaceStore';

interface IResponse {
  result: unknown;
}

const actions = {
  [ACTION_SET_MESSAGES](store: IStore, room: string): Promise<void> {
    return fetch(`https://nane.tada.team/api/rooms/${room}/history`)
      .then((stream) => stream.json())
      .then((res: IResponse) => {
        store.commit(MUTATION_SET_MESSAGES, res.result);
      });
  },
  [ACTION_SET_ROOMS](store: IStore): Promise<void> {
    return fetch('https://nane.tada.team/api/rooms')
      .then((stream) => stream.json())
      .then((res: IResponse) => {
        store.commit(MUTATION_SET_ROOMS, res.result);
      });
  },
  [ACTION_SET_SETTINGS](store: IStore): Promise<void> {
    return fetch('https://nane.tada.team/api/settings')
      .then((stream) => stream.json())
      .then((res: IResponse) => {
        store.commit(MUTATION_SET_SETTINGS, res.result);
      });
  },
};

export default actions;
