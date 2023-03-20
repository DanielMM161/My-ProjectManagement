import { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useAppDispatch } from '../hooks/redux.hook';
import { getProfile, login } from '../services/user.service';
import { useNavigate } from 'react-router';

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleGetProfile = () => {
    dispatch(getProfile())
      .then(() => {
        navigate("/dashboard");
      });
  }

  const handleSubmit = () => {
    if (!checkFields())
    {
      dispatch(login({ email: email, password: password }))
        .then(() => {
          handleGetProfile();
        });
    }  
  };

  const checkFields = (): Boolean => {
    let isError = false; 
    const newErrors: { [key: string]: string } = {};
    if (!email) {
      isError = true;
      newErrors['email'] = 'Email is required';
    } 
    if (!password) {
      isError = true;
      newErrors['password'] = 'Password is required';
    }
    setErrors(newErrors);
    return isError;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome back!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Log in to your account to continue.
          </Typography>
          <form style={{ width: '100%' }}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={Boolean(errors['email'])}              
              helperText={errors['email']}
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={Boolean(errors['password'])}              
              helperText={errors['password']}
              type="password"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" fullWidth onClick={() => handleSubmit()}>
              Log In
            </Button>
          </form>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1">
              Don't have an account yet?{' '}
              <Button component="a" href="/register" sx={{ pl: 0 }}>
                Sign up now
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
