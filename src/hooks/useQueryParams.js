import { useLocation } from 'react-router-dom';

// hook to get the current query params
export const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};
