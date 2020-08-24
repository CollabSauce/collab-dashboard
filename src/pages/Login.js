import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { jsdataStore } from 'src/store/jsdata';
import { setAuthToken } from 'src/utils/auth';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';

const useStyles = makeStyles({
  loginPage: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  loginMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    // backgroundColor: colors.gray7,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 48,
    paddingLeft: 38,
    paddingRight: 38,
    paddingBottom: 32,
    height: 500,
  },
  title: {
    // color: colors.blue4,
    marginBottom: 45,
  },
  input: {
    marginBottom: 24,
    height: 70,
  },
  loginButtonHolder: {
    marginTop: 24,
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  loginButton: {
    height: 42,
    width: 200,
  },
  loginButtonText: {
    fontSize: 18,
  },
});

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectToPreviousRoute, setRedirectToPreviousRoute] = useState(false);
  const dispatch = useDispatch();

  const login = async (event) => {
    event.preventDefault();
    setLoginError('');
    try {
      if (email.length && email.includes('@')) {
        setErrors('');
        setLoading(true);

        const response = await jsdataStore.getMapper('user').loginUser({ data: { email, password } });
        setAuthToken(response.data.key);

        await dispatch.app.initializeApp();

        setRedirectToPreviousRoute(true);
      } else {
        setErrors('Please enter a valid email');
      }
    } catch (e) {
      setLoginError('Credentials were incorrect. Please try again.');
      setLoading(false);
    }
  };

  const setErrors = (emailErrorText) => {
    const fieldErrorsCopy = { ...fieldErrors };
    fieldErrorsCopy.email = emailErrorText;
    setFieldErrors(fieldErrorsCopy);
  };

  const queryParams = useQueryParams();
  const next = queryParams.get('next') || DEFAULT_ROUTE_WHEN_AUTHENTICATED;

  if (redirectToPreviousRoute) {
    return <Redirect to={next} />;
  }

  return (
    <div className={classes.loginPage}>
      <div className={classes.loginMain}>
        <form onSubmit={login} className={classes.loginForm}>
          <Typography variant="h5" align="center" className={classes.title}>
            CollabSauce Login
          </Typography>
          <TextField
            id="outlined-email-input"
            label="Email"
            name="email"
            autoComplete="email"
            margin="dense"
            variant="outlined"
            error={!!fieldErrors.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.input}
            helperText={fieldErrors.email}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="dense"
            variant="outlined"
            error={!!fieldErrors.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.input}
          />

          <div className={classes.loginButtonHolder}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!email || !password}
                className={classes.loginButton}
              >
                <Typography variant="body1" color="inherit" className={classes.loginButtonText}>
                  Login
                </Typography>
              </Button>
            )}
          </div>

          {loginError && (
            <Typography variant="body1" color="error" align="center">
              {loginError}
            </Typography>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
