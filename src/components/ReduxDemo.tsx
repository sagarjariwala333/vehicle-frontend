import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Alert,
  Chip,
  Stack,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  useAppDispatch,
  useAppSelector,
  selectFormData,
  selectCurrentStep,
  selectVehicleTypes,
  selectVehicleTypesLoading,
  selectVehicleModels,
  selectVehicleModelsLoading,
  selectNotifications,
  selectCurrentUser,
  selectIsAuthenticated,
} from '../store';
import { resetForm } from '../store/slices/formSlice';
import {
  clearVehicleTypes,
  clearVehicleModels,
} from '../store/slices/vehiclesSlice';
import { clearNotifications, addNotification } from '../store/slices/uiSlice';
import {
  loginUser,
  logoutUser,
  initializeUser,
} from '../store/slices/userSlice';
import ReduxFormWizard from './organisms/ReduxFormWizard';
import { FormData } from '../store/types';

const ReduxDemo: React.FC = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const formData = useAppSelector(selectFormData);
  const currentStep = useAppSelector(selectCurrentStep);
  const vehicleTypes = useAppSelector(selectVehicleTypes);
  const vehicleTypesLoading = useAppSelector(selectVehicleTypesLoading);
  const vehicleModels = useAppSelector(selectVehicleModels);
  const vehicleModelsLoading = useAppSelector(selectVehicleModelsLoading);
  const notifications = useAppSelector(selectNotifications);
  const currentUser = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Initialize user on component mount
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Form submitted with Redux:', data);
  };

  const handleLogin = () => {
    dispatch(loginUser({ email: 'demo@example.com', password: 'password' }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleResetForm = () => {
    dispatch(resetForm());
  };

  const handleClearVehicleData = () => {
    dispatch(clearVehicleTypes());
    dispatch(clearVehicleModels());
  };

  const handleAddNotification = () => {
    dispatch(
      addNotification({
        message: 'This is a test notification from Redux!',
        type: 'info',
      })
    );
  };

  const handleClearNotifications = () => {
    dispatch(clearNotifications());
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Redux Toolkit Integration Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Redux State Panel */}
        <Grid xs={12} lg={4}>
          <Stack spacing={3}>
            {/* User State */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                User State
              </Typography>
              {isAuthenticated && currentUser ? (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Logged in as {currentUser.firstName} {currentUser.lastName}
                  </Alert>
                  <Button variant="outlined" onClick={handleLogout} fullWidth>
                    Logout
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Not authenticated
                  </Alert>
                  <Button variant="contained" onClick={handleLogin} fullWidth>
                    Login (demo@example.com)
                  </Button>
                </Box>
              )}
            </Paper>

            {/* Form State */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Form State
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  Current Step: {currentStep}/5
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(currentStep / 5) * 100}
                  sx={{ mt: 1 }}
                />
              </Box>

              <Typography variant="body2" gutterBottom>
                Form Data:
              </Typography>
              <Box
                component="pre"
                sx={{
                  fontSize: '0.75rem',
                  bgcolor: 'grey.100',
                  p: 1,
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: 200,
                }}
              >
                {JSON.stringify(formData, null, 2)}
              </Box>

              <Button
                variant="outlined"
                onClick={handleResetForm}
                fullWidth
                sx={{ mt: 2 }}
              >
                Reset Form
              </Button>
            </Paper>

            {/* Vehicle Data State */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Vehicle Data State
              </Typography>

              <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                  Vehicle Types ({vehicleTypes.length}):
                </Typography>
                {vehicleTypesLoading && <LinearProgress sx={{ mb: 1 }} />}
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {vehicleTypes.map((type) => (
                    <Chip
                      key={type.id}
                      label={`${type.name} (${type.wheels}w)`}
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>

              <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                  Vehicle Models ({vehicleModels.length}):
                </Typography>
                {vehicleModelsLoading && <LinearProgress sx={{ mb: 1 }} />}
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {vehicleModels.map((model) => (
                    <Chip
                      key={model.id}
                      label={model.name}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Box>

              <Button
                variant="outlined"
                onClick={handleClearVehicleData}
                fullWidth
              >
                Clear Vehicle Data
              </Button>
            </Paper>

            {/* Notifications */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Notifications ({notifications.length})
              </Typography>

              <Stack spacing={1} mb={2}>
                {notifications.slice(-3).map((notification) => (
                  <Alert
                    key={notification.id}
                    severity={notification.type}
                    sx={{ fontSize: '0.875rem' }}
                  >
                    {notification.message}
                  </Alert>
                ))}
                {notifications.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No notifications
                  </Typography>
                )}
              </Stack>

              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={handleAddNotification}
                  size="small"
                >
                  Add Test
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearNotifications}
                  size="small"
                >
                  Clear All
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Redux Form Wizard */}
        <Grid xs={12} lg={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Redux-Powered Form Wizard
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This form wizard is fully integrated with Redux Toolkit. All form
              state, API calls, and UI state are managed through Redux slices.
            </Typography>

            <ReduxFormWizard
              onSubmit={handleFormSubmit}
              onStepChange={(step) => console.log('Step changed to:', step)}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Redux Features Overview */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom align="center">
          Redux Toolkit Features Implemented
        </Typography>

        <Grid container spacing={3} mt={2}>
          <Grid xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Form Management
                </Typography>
                <Typography variant="body2">
                  • Form data state
                  <br />
                  • Validation errors
                  <br />
                  • Step navigation
                  <br />
                  • Field updates
                  <br />• Form reset
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Async Operations
                </Typography>
                <Typography variant="body2">
                  • API calls with createAsyncThunk
                  <br />
                  • Loading states
                  <br />
                  • Error handling
                  <br />
                  • Data caching
                  <br />• Retry logic
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  User Management
                </Typography>
                <Typography variant="body2">
                  • Authentication state
                  <br />
                  • User profile data
                  <br />
                  • Login/logout actions
                  <br />
                  • Persistent sessions
                  <br />• Profile updates
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  UI State
                </Typography>
                <Typography variant="body2">
                  • Theme management
                  <br />
                  • Loading indicators
                  <br />
                  • Notifications
                  <br />
                  • Modal states
                  <br />• Global UI flags
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ReduxDemo;
