import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import OrganismDemo from '../../components/OrganismDemo';

const OrganismsDemo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Organisms Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Complex components made from molecules and atoms
        </Typography>
      </Box>
      <OrganismDemo />
    </Container>
  );
};

export default OrganismsDemo;
