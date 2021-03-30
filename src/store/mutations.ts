import { IState } from '@/types/InterfaceState';
import { IMessage } from '@/types/InterfaceMessage';

const mutations = {
  setSelectedRoom(state: IState, value: string): void {
    state.selectedRoom = value;
  },
  setMessages(state: IState, messages: IMessage[]): void {
    state.messages = messages;
  },
};

export default mutations;
