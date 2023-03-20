import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

import { useAppDispatch } from '../../hooks/redux.hook';
import { getProfile, login, register } from '../../services/user.service';


function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleLogin = () => {
    dispatch(login({ email, password}))
      .then(result => {                  
          if(result) {
            navigate("/dashboard");
          }
      })
  }

  const handleRegister = () => {    
    if(!checkFields())
    {      
      dispatch(register({
        firstName,
        lastName,
        email,
        password
      }))
      .then(result => {        
        if (result) {
          handleLogin()
        }
      })
    }
  };

  const checkFields = (): Boolean => {
    let isError = false; 
    const newErrors: { [key: string]: string } = {};
    if (!firstName) {
      isError = true;
      newErrors['firstName'] = 'firstName is required';
    } 
    if (!lastName) {
      isError = true;
      newErrors['lastName'] = 'Last name is required';
    }
    if (!email) {
      isError = true;
      newErrors['email'] = 'Email is required';
    }
    if (!password) {
      isError = true;
      newErrors['password'] = 'password is required';
    }    
    setErrors(newErrors);
    return isError;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10, mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Join the team!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Create an account to start managing your projects.
          </Typography>
          <form style={{ width: '100%' }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              fullWidth
              error={Boolean(errors['firstName'])}              
              helperText={errors['firstName']}
              sx={{ mb: 2 }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              fullWidth
              error={Boolean(errors['lastName'])}              
              helperText={errors['lastName']}
              sx={{ mb: 2 }}
            />
            <TextField              
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              fullWidth
              error={Boolean(errors['email'])}              
              helperText={errors['email']}
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
            <Button variant="contained" fullWidth onClick={() => handleRegister()}>
              Sign Up
            </Button>
          </form>
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1">
              Already have an account?{' '}
              <Button component="a" href="/login" sx={{ pl: 0 }} type='submit'>
                Log in now
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register
