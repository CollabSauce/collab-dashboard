import { jsdataStore } from 'src/store/jsdata';

export const app = {
  state: {
    currentUserId: null,
    showBurgerMenu: false, // controls showing vertical nav on mobile
    isNavbarVerticalCollapsed: false,
    isKanban: false,
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
    setIsKanban(state, isKanban) {
      return { ...state, isKanban };
    },
  },
  effects: (dispatch) => ({
    async initializeApp(_, rootState) {
      try {
        const response = await jsdataStore.getMapper('user').fetchCurrentUser();
        dispatch.app.setCurrentUserId(response.data.user.id);
      } catch (e) {
        console.log(e);
        return;
      }
    },
    async destructApp() {
      // do something here????
    },
  }),
};
