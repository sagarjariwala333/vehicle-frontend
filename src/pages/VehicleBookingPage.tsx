import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Alert,
  Snackbar,
  LinearProgress,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store';
import {
  selectNotifications,
  selectIsSubmitting,
  removeNotification,
} from '../store';
import ReduxFormWizard from '../components/organisms/ReduxFormWizard';

const VehicleBookingPage: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage] = useState('');

  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const isSubmitting = useAppSelector(selectIsSubmitting);

  const handleStepChange = (step: number) => {
    console.log(`Current step: ${step}`);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const _handleCloseNotification = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  // Auto-remove notifications after 6 seconds
  useEffect(() => {
    notifications.forEach((notification) => {
      setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 6000);
    });
  }, [notifications, dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Vehicle Rental Booking
        </Typography>
        <Typography variant="h6" color="text.secondary" align="center">
          Complete the form below to book your vehicle rental
        </Typography>
      </Box>

      {isSubmitting && (
        <Box mb={2}>
          <LinearProgress />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Processing your booking...
          </Typography>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <ReduxFormWizard onStepChange={handleStepChange} />
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSuccess}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Notification Snackbars */}
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={notification.type} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </Container>
  );
};

export default VehicleBookingPage;
