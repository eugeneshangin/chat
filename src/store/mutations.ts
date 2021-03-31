import Vue from 'vue';
import { IState } from '@/types/InterfaceState';
import { IMessage, IWSMessage, IDataMessage } from '@/types/InterfaceMessage';
import {
  SOCKET_ONOPEN,
  SOCKET_ONMESSAGE,
  MUTATION_SET_MESSAGES,
  MUTATION_SET_ROOMS,
  SET_SELECTED_ROOM,
  MUTATION_ADD_ROOM, MUTATION_SET_SETTINGS,
} from '@/types/mutations';
import { IRoom } from '@/types/InterfaceRoom';
import { ISettings } from '@/types/InterfaceSettings';

const mutations = {
  [SET_SELECTED_ROOM](state: IState, value: string): void {
    state.selectedRoom = value;
  },
  [MUTATION_SET_MESSAGES](state: IState, messages: IMessage[]): void {
    state.messages = messages;
  },
  [MUTATION_SET_ROOMS](state: IState, rooms: IRoom[]): void {
    state.rooms = rooms;
  },
  [SOCKET_ONOPEN](state: IState, event: Event): void {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  [SOCKET_ONMESSAGE](state: IState, message: IWSMessage): void {
    const messageObj:IDataMessage = JSON.parse(message.data);
    state.socket.message = message.data;

    // если мы сейчас находимся в этой комнате то добавил сообщение
    if (messageObj.room === state.selectedRoom) {
      state.messages.push({
        sender: messageObj.sender,
        created: messageObj.created,
        text: messageObj.text,
      });
    }

    // находим объкт этой комнаты
    const room = state.rooms.find((r) => r.name === messageObj.room);
    if (room) {
      // меняем последнее сообщение
      room.last_message = {
        sender: messageObj.sender,
        created: messageObj.created,
        text: messageObj.text,
      };

      // увеличим счетчик непрочитанных сообщений если сообщение пришло не в эту комнату
      if (messageObj.room !== state.selectedRoom) {
        // если только пришло сообщение поднимем комнату наверх
        if (!room.countNewMessage) {
          state.rooms = state.rooms.filter((r) => r.name !== room.name);
          state.rooms.unshift(room);
        }

        // увеличим счетчик непрочитанных
        room.countNewMessage = room.countNewMessage ? room.countNewMessage + 1 : 1;
      }
    }
  },
  [MUTATION_ADD_ROOM](state: IState, room: IRoom): void {
    if (room) {
      state.rooms.unshift(room);
      state.selectedRoom = room.name;
    }
  },
  [MUTATION_SET_SETTINGS](state: IState, settings: ISettings): void {
    state.settings = settings;
  },
};

export default mutations;
