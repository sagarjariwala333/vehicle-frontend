import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ComponentDemo from '../../components/ComponentDemo';

const AtomsDemo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Atoms Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Basic building blocks of the component library
        </Typography>
      </Box>
      <ComponentDemo />
    </Container>
  );
};

export default AtomsDemo;
