import React from 'react';
import { Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12} textAlign="center">
          <Typography color='error' variant="h5" component="h1" gutterBottom>
            This page doesn't exist
          </Typography>
          <Button variant="contained" color="primary" size="large" onClick={() => navigate('/')}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;