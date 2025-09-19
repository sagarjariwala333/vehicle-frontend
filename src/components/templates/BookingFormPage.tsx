import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  DirectionsCar,
  AccountCircle,
  Help,
  Settings,
  Logout,
} from '@mui/icons-material';
import { FormWizard } from '../organisms';

// Types
interface FormData {
  firstName: string;
  lastName: string;
  numberOfWheels: string;
  vehicleType: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
}

interface VehicleType {
  id: string;
  name: string;
  wheels: number;
}

interface VehicleModel {
  id: string;
  name: string;
  typeId: string;
}

interface BookingFormPageProps {
  companyName?: string;
  companyLogo?: string;
  userName?: string;
  userAvatar?: string;
  onFormSubmit?: (data: FormData) => Promise<void>;
  onLogout?: () => void;
  vehicleTypesApi?: () => Promise<VehicleType[]>;
  vehicleModelsApi?: (typeId: string) => Promise<VehicleModel[]>;
  showUserMenu?: boolean;
  showHelpButton?: boolean;
  initialFormData?: Partial<FormData>;
}

const BookingFormPage: React.FC<BookingFormPageProps> = ({
  companyName = 'VehicleRent Pro',
  companyLogo,
  userName = 'John Doe',
  userAvatar,
  onFormSubmit,
  onLogout,
  vehicleTypesApi,
  vehicleModelsApi,
  showUserMenu = true,
  showHelpButton = true,
  initialFormData,
}) => {
  // State for user menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [submissionStatus, setSubmissionStatus] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    onLogout?.();
  };

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    try {
      if (onFormSubmit) {
        await onFormSubmit(data);
      } else {
        // Default success simulation
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      setSubmissionStatus({
        open: true,
        message:
          'Booking submitted successfully! You will receive a confirmation email shortly.',
        severity: 'success',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus({
        open: true,
        message: 'Failed to submit booking. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleStepChange = (step: number) => {
    console.log(`User is now on step ${step}`);
    // You can add analytics tracking here
  };

  const handleSnackbarClose = () => {
    setSubmissionStatus((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {/* Company Logo and Name */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            {companyLogo ? (
              <Avatar
                src={companyLogo}
                alt={companyName}
                sx={{ mr: 2, bgcolor: 'white' }}
              >
                <DirectionsCar />
              </Avatar>
            ) : (
              <Avatar sx={{ mr: 2, bgcolor: 'primary.dark' }}>
                <DirectionsCar />
              </Avatar>
            )}
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {companyName}
            </Typography>
            <Chip
              label="Vehicle Booking"
              size="small"
              sx={{
                ml: 2,
                bgcolor: 'primary.light',
                color: 'white',
                fontWeight: 500,
              }}
            />
          </Box>

          {/* Help Button */}
          {showHelpButton && (
            <IconButton color="inherit" sx={{ mr: 1 }} title="Help & Support">
              <Help />
            </IconButton>
          )}

          {/* User Menu */}
          {showUserMenu && (
            <Box display="flex" alignItems="center">
              <Typography
                variant="body2"
                sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}
              >
                {userName}
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleUserMenuOpen}
                title="User Menu"
              >
                {userAvatar ? (
                  <Avatar src={userAvatar} sx={{ width: 32, height: 32 }} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleUserMenuClose}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                  <Settings sx={{ mr: 1 }} />
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box mb={4} textAlign="center">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, color: 'primary.main' }}
          >
            Book Your Vehicle
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Complete the form below to reserve your preferred vehicle. Our team
            will confirm your booking within 24 hours.
          </Typography>
        </Box>

        {/* Form Wizard Container */}
        <Paper
          elevation={1}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            bgcolor: 'white',
          }}
        >
          <FormWizard
            onSubmit={handleFormSubmit}
            onStepChange={handleStepChange}
            vehicleTypesApi={vehicleTypesApi}
            vehicleModelsApi={vehicleModelsApi}
            initialData={initialFormData}
          />
        </Paper>

        {/* Footer Information */}
        <Box mt={6} textAlign="center">
          <Typography variant="body2" color="text.secondary" paragraph>
            Need help? Contact our support team at{' '}
            <Typography
              component="span"
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              support@vehiclerent.com
            </Typography>{' '}
            or call{' '}
            <Typography
              component="span"
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              1-800-VEHICLE
            </Typography>
          </Typography>
          <Typography variant="caption" color="text.disabled">
            © 2024 {companyName}. All rights reserved. | Privacy Policy | Terms
            of Service
          </Typography>
        </Box>
      </Container>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={submissionStatus.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={submissionStatus.severity}
          sx={{ width: '100%' }}
        >
          {submissionStatus.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingFormPage;
