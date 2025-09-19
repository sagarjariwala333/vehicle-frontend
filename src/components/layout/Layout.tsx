import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleBookingClick = () => {
    navigate('/vehicle');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <DirectionsCarIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={handleHomeClick}
          >
            Vehicle Rental
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              onClick={handleHomeClick}
              sx={{
                textDecoration:
                  location.pathname === '/' ? 'underline' : 'none',
              }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={handleBookingClick}
              sx={{
                textDecoration:
                  location.pathname === '/vehicle' ? 'underline' : 'none',
              }}
            >
              Book Vehicle
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: 'grey.100',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Vehicle Rental Service. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
