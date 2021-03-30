const actions = {
  changeMessages(store: any): Promise<void> {
    const room = store.state.selectedRoom;
    console.log(room);
    return fetch(`https://nane.tada.team/api/rooms/${room}/history`)
      .then((stream) => stream.json())
      .then((res: { result: any }) => {
        store.commit('setMessages', res.result);
      });
  },
};

export default actions;
