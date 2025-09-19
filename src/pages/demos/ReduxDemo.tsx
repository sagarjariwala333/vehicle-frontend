import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ReduxDemo from '../../components/ReduxDemo';

const ReduxDemoPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Redux Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          State management and form handling examples
        </Typography>
      </Box>
      <ReduxDemo />
    </Container>
  );
};

export default ReduxDemoPage;
