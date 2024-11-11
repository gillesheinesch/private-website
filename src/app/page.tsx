import React from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';

export default function Home() {
  return (
    <>
    <Alert variant='filled' severity='warning' sx={{
        m: 3
    }}>
    This website is a work in progress.
    </Alert>
    <Container
    maxWidth="lg"
    sx={{
        mt: 8,
        position: 'relative',
        overflow: 'hidden'
    }}>
      <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
            zIndex: 1
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Gilles Heinesch
        </Typography>
        <Typography variant="body1">
          I am an aviation enthusiast and a passionate web developer. Explore my projects, learn more about me, and feel free to get in touch.
        </Typography>
      </Box>
    </Container>
    </>
  );
}