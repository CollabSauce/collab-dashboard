import { createMuiTheme } from '@material-ui/core/styles';

// import { colors } from './colors';

// Customize Theme Here
export const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'inherit', // buttons by default have UPPERCASE text. We don't want this.
    },
  },
});
