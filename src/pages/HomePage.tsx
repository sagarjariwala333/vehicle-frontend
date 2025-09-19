import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartBooking = () => {
    navigate('/vehicle');
  };

  const features = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Wide Vehicle Selection',
      description:
        'Choose from cars, motorcycles, and more to suit your needs.',
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Flexible Booking',
      description: 'Book for any date range that works for your schedule.',
    },
    {
      icon: <TwoWheelerIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Easy Process',
      description: 'Simple step-by-step booking process in just a few minutes.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={8}>
        <Typography variant="h2" component="h1" gutterBottom>
          Vehicle Rental Service
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Rent the perfect vehicle for your journey
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleStartBooking}
          sx={{ mt: 3, px: 4, py: 1.5 }}
        >
          Start Booking Now
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" textAlign="center" mb={4}>
        Why Choose Us?
      </Typography>

      <Grid container spacing={4} mb={8}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box mb={2}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA Section */}
      <Box
        textAlign="center"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          p: 6,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" paragraph>
          Book your vehicle in just a few simple steps
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleStartBooking}
          sx={{ mt: 2 }}
        >
          Book Your Vehicle
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
