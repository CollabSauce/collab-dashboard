export const kanban = {
  state: {
    modal: false,
    modalContent: {},
  },
  reducers: {
    setModal(state, modal) {
      return { ...state, modal };
    },
    setModalContent(state, modalContent) {
      return { ...state, modalContent };
    },
  },
  effects: (dispatch) => ({}),
};
