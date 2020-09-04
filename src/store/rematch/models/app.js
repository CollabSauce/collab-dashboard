import { jsdataStore } from 'src/store/jsdata';

export const app = {
  state: {
    currentUserId: null,
    showBurgerMenu: false, // controls showing vertical nav on mobile
    isNavbarVerticalCollapsed: false,
  },
  reducers: {
    setCurrentUserId(state, currentUserId) {
      return { ...state, currentUserId };
    },
    setShowBurgerMenu(state, showBurgerMenu) {
      return { ...state, showBurgerMenu };
    },
    setIsNavbarVerticalCollapsed(state, isNavbarVerticalCollapsed) {
      return { ...state, isNavbarVerticalCollapsed };
    },
  },
  effects: (dispatch) => ({
    async initializeApp(_, rootState) {
      try {
        const response = await jsdataStore.getMapper('user').fetchCurrentUser();
        dispatch.app.setCurrentUserId(response.data.user.id);
      } catch (e) {
        return;
      }
    },
    async destructApp() {
      // do something here????
    },
  }),
};
