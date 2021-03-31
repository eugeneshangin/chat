import { Commit } from 'vuex';
import { IState } from './InterfaceState';

/**
 * Интерфейс для стора
 */
export interface IStore {
  state: IState;
  commit: Commit;
}
