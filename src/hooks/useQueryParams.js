import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

// hook to get the current query params
export const useQueryParams = () => {
  return queryString.parse(useLocation().search);
};
