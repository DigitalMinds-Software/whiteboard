import React from 'react';
import { Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Whiteboard App
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Collaborate, Draw, and Share Ideas in Real-Time
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/signup')}>
            Get Started
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Landing;