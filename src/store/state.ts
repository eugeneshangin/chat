import { IState } from '@/types/InterfaceState';

const state: IState = {
  selectedRoom: '',
  messages: [],
  rooms: [],
  socket: {
    isConnected: false,
    message: '',
    reconnectError: false,
  },
  settings: {},
};

export default state;
