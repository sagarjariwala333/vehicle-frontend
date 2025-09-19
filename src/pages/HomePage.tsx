import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import ReduxFormWizard from '../components/organisms/ReduxFormWizard';

const HomePage: React.FC = () => {
  const handleStepChange = (step: number) => {
    console.log(`Current step: ${step}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.50',
      }}
    >
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            Vehicle Rental Booking
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Complete the form below to book your vehicle rental
          </Typography>
        </Box>

        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
          }}
        >
          <ReduxFormWizard onStepChange={handleStepChange} />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
