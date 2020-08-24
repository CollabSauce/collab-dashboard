import { jsdataStore } from 'src/store/jsdata';

export const app = {
  state: {
    currentUserId: null,
    containerWidth: 0,
  },
  reducers: {
    setCurrentUserId(state, currentUserId) {
      return { ...state, currentUserId };
    },
    setContainerWidth(state, containerWidth) {
      return { ...state, containerWidth };
    },
  },
  effects: (dispatch) => ({
    async initializeApp(_, rootState) {
      const response = await jsdataStore.getMapper('user').fetchCurrentUser();
      if (!response) {
        return;
      }
      dispatch.app.setCurrentUserId(response.data.user.id);
    },
    async destructApp() {
      // do something here????
    },
  }),
};
