import { useSelector } from 'react-redux';

import { useStoreState } from './useStoreState';

// hook to get the current user
export const useCurrentUser = () => {
  const currentUserId = useSelector((state) => state.app.currentUserId);
  return useStoreState((store) => store.get('user', currentUserId), [currentUserId]);
};
