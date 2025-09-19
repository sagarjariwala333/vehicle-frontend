import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TemplateDemo from '../../components/TemplateDemo';

const TemplatesDemo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Templates Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Page-level layouts and structures
        </Typography>
      </Box>
      <TemplateDemo />
    </Container>
  );
};

export default TemplatesDemo;
