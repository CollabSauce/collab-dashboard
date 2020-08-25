import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { jsdataStore } from 'src/store/jsdata';
import { setAuthToken } from 'src/utils/auth';
import { handleNetworkError } from 'src/utils/error';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';

const useStyles = makeStyles({
  authPage: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  authMain: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  authForm: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingTop: 48,
    paddingLeft: 38,
    paddingRight: 38,
    paddingBottom: 32,
    height: 500,
    width: '100%',
    maxWidth: 500,
  },
  title: {
    marginBottom: 45,
  },
  input: {
    marginBottom: 24,
    height: 70,
  },
  authButtonHolder: {
    marginTop: 24,
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center',
  },
  authButton: {
    height: 42,
    width: 200,
  },
  authButtonText: {
    fontSize: 18,
  },
});

const Auth = ({ authType }) => {
  const isRegister = authType === 'signup';
  const isLogin = authType === 'login';
  const isForgotPassword = authType === 'forgot_password';

  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectToPreviousRoute, setRedirectToPreviousRoute] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const dispatch = useDispatch();

  let isDisabled = false;
  if (isRegister) {
    isDisabled = !email || !password || !password2;
  } else if (isLogin) {
    isDisabled = !email || !password;
  } else {
    isDisabled = !email;
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setAuthError('');
    setResetEmailSent(false);
    try {
      if (email.length && email.includes('@')) {
        setErrors('');
        setLoading(true);

        if (isForgotPassword) {
          await jsdataStore.getMapper('user').resetPassword({ data: { email } });
          setResetEmailSent(true);
          setLoading(false);
        } else {
          const credentials = isRegister ? { email, password1: password, password2 } : { email, password };
          const method = isRegister ? 'signupUser' : 'loginUser';
          const response = await jsdataStore.getMapper('user')[method]({ data: credentials });
          setAuthToken(response.data.key); // DOES THIS WORK FOR SIGNUP?
          await dispatch.app.initializeApp();
          setLoading(false);
          setRedirectToPreviousRoute(true);
        }
      } else {
        setErrors('Please enter a valid email');
      }
    } catch (e) {
      setAuthError(handleNetworkError(e));
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
    <div className={classes.authPage}>
      <div className={classes.authMain}>
        <form onSubmit={onSubmitForm} className={classes.authForm}>
          <Typography variant="h5" align="center" className={classes.title}>
            CollabSauce {isRegister ? 'Signup' : isLogin ? 'Login' : 'Reset Password'}
          </Typography>

          {isForgotPassword && !resetEmailSent && (
            <Typography variant="body1" color="inherit" className={classes.authButtonText}>
              Please enter your email address. Reset instructions will be sent to you.
            </Typography>
          )}

          {resetEmailSent && (
            <Typography variant="body1" color="success" className={classes.authButtonText}>
              Please check your email for reset instructions.
            </Typography>
          )}

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

          {(isLogin || isRegister) && (
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
          )}

          {isRegister && (
            <TextField
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              margin="dense"
              variant="outlined"
              error={!!fieldErrors.password}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className={classes.input}
            />
          )}

          {isLogin && (
            <Button color="primary" component={Link} to="/forgot-password">
              <Typography variant="body1" color="inherit">
                Forgot Password?
              </Typography>
            </Button>
          )}

          <div className={classes.authButtonHolder}>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isDisabled}
                className={classes.authButton}
              >
                <Typography variant="body1" color="inherit" className={classes.authButtonText}>
                  {isRegister ? 'Register' : isLogin ? 'Login' : 'Send Email'}
                </Typography>
              </Button>
            )}
          </div>

          {authError && (
            <Typography variant="body1" color="error" align="center">
              {authError}
            </Typography>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
