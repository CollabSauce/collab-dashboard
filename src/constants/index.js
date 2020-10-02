export const API_PATH = '/api';
export const AUTH_TOKEN_KEY = 'auth_token';

let basePath = '';
if (process.env.REACT_APP_ENV === 'development') {
  basePath = 'http://localhost:8000';
} else if (process.env.REACT_APP_ENV === 'staging') {
  basePath = 'https://api-staging-collabsauce.herokuapp.com';
} else if (process.env.REACT_APP_ENV === 'production') {
  basePath = 'https://api.collabsauce.com';
}

export const BASE_PATH = basePath;

export const DEFAULT_ROUTE_WHEN_AUTHENTICATED = '/';
export const DEFAULT_ROUTE_WHEN_UNAUTHENTICATED = '/login';

export const navbarBreakPoint = 'xl'; // Vertical navbar breakpoint
