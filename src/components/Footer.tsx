import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer">
        <Container maxWidth="lg">
            <Typography variant="body1" align='center'>
                &copy; {new Date().getFullYear()}{' '} Gilles Heinesch
            </Typography>
        </Container>
    </Box>
  );
};

export default Footer;