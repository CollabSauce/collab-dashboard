import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const REPLACE_KEY = '__<<^^>>__';
// hook to get the current query params
export const useQueryParams = () => {
  // need to do the "replace" because the .parse method turns %20 into spaces, when they should be pluses.
  let qps = queryString.parse(useLocation().search.replace('%20', REPLACE_KEY));
  for (let key in qps) {
    qps[key] = qps[key].replace(REPLACE_KEY, '+');
  }
  return qps;
};
