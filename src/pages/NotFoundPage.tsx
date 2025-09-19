import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Box mb={4}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: 'error.main', mb: 2 }} />
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          color="text.secondary"
        >
          Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleGoHome}
        sx={{ mt: 2 }}
      >
        Go Back Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
