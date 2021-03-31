import { Commit } from 'vuex';
import { IState } from './InterfaceState';

export interface IStore {
  state: IState;
  commit: Commit;
}
