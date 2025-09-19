import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MoleculeDemo from '../../components/MoleculeDemo';

const MoleculesDemo: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Molecules Demo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Combinations of atoms working together
        </Typography>
      </Box>
      <MoleculeDemo />
    </Container>
  );
};

export default MoleculesDemo;
