import Vue from 'vue';
import { IState } from '@/types/InterfaceState';
import { IMessage, IWSMessage, IDataMessage } from '@/types/InterfaceMessage';
import {
  SOCKET_ONOPEN,
  SOCKET_ONMESSAGE,
  SOCKET_ONCLOSE,
  MUTATION_SET_MESSAGES,
  MUTATION_SET_ROOMS,
  SET_SELECTED_ROOM,
  MUTATION_ADD_ROOM, MUTATION_SET_SETTINGS,
} from '@/types/mutations';
import { IRoom } from '@/types/InterfaceRoom';
import { ISettings } from '@/types/InterfaceSettings';

const mutations = {
  // выбор комнаты
  [SET_SELECTED_ROOM](state: IState, value: string): void {
    state.selectedRoom = value;
    const index = state.rooms.findIndex((room) => room.name === value);
    const room = state.rooms[index];
    // сбрасываем счетчик не прочитанных сообщений
    state.rooms.splice(index, 1, {
      last_message: room.last_message,
      name: room.name,
      countNewMessage: 0,
    });
  },
  // обновления списка сообщений
  [MUTATION_SET_MESSAGES](state: IState, messages: IMessage[]): void {
    state.messages = messages;
  },
  // обновление списка комнат
  [MUTATION_SET_ROOMS](state: IState, rooms: IRoom[]): void {
    state.rooms = rooms;
  },
  // добавление новой комнаты
  [MUTATION_ADD_ROOM](state: IState, room: IRoom): void {
    if (room) {
      state.rooms.unshift(room);
      state.selectedRoom = room.name;
    }
  },
  // установка настроек
  [MUTATION_SET_SETTINGS](state: IState, settings: ISettings): void {
    state.settings = settings;
  },
  // мутация открытия сокета
  [SOCKET_ONOPEN](state: IState, event: Event): void {
    Vue.prototype.$socket = event.currentTarget;
    state.socket.isConnected = true;
  },
  // мутация закрытия сокета
  [SOCKET_ONCLOSE](state: IState): void {
    state.socket.isConnected = false;
  },
  // мутация получаения ws сообщения
  [SOCKET_ONMESSAGE](state: IState, message: IWSMessage): void {
    // парсим строку с данными в объект сообщения
    const messageObj:IDataMessage = JSON.parse(message.data);
    state.socket.message = message.data;

    // если мы сейчас находимся в этой комнате то добавил сообщение в список
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
    } else {
      const newRoom: IRoom = {
        last_message: {
          sender: messageObj.sender,
          created: messageObj.created,
          text: messageObj.text,
        },
        name: messageObj.room,
        countNewMessage: 0,
      };
      state.rooms.unshift(newRoom);
      state.selectedRoom = messageObj.room;
    }
  },
};

export default mutations;
