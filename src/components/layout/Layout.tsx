import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleDemosClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDemosClose = () => {
    setAnchorEl(null);
  };

  const handleDemoNavigation = (path: string) => {
    navigate(path);
    handleDemosClose();
  };

  const isDemoPath = location.pathname.startsWith('/demos');

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
              onClick={handleDemosClick}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                textDecoration: isDemoPath ? 'underline' : 'none',
              }}
            >
              Demos
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleDemosClose}
            >
              <MenuItem onClick={() => handleDemoNavigation('/demos/atoms')}>
                Atoms
              </MenuItem>
              <MenuItem
                onClick={() => handleDemoNavigation('/demos/molecules')}
              >
                Molecules
              </MenuItem>
              <MenuItem
                onClick={() => handleDemoNavigation('/demos/organisms')}
              >
                Organisms
              </MenuItem>
              <MenuItem
                onClick={() => handleDemoNavigation('/demos/templates')}
              >
                Templates
              </MenuItem>
              <MenuItem onClick={() => handleDemoNavigation('/demos/redux')}>
                Redux
              </MenuItem>
            </Menu>
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
