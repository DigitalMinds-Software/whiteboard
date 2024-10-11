import React from 'react';
import { Typography, Link, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 'auto', py: 2 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Your Whiteboard App. All rights reserved.
        <Link color="inherit" href="/privacy" sx={{ ml: 1 }}>
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link color="inherit" href="/terms" sx={{ ml: 1 }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;