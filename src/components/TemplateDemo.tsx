import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Alert,
  Switch,
  FormControlLabel,
  TextField,
  Grid,
} from '@mui/material';
import { BookingFormPage } from './templates';

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

const TemplateDemo: React.FC = () => {
  const [demoMode, setDemoMode] = useState<'full' | 'preview'>('preview');
  const [showSubmissionResult, setShowSubmissionResult] = useState(false);
  const [submissionData, setSubmissionData] = useState<FormData | null>(null);

  // Template customization options
  const [templateConfig, setTemplateConfig] = useState({
    companyName: 'VehicleRent Pro',
    userName: 'John Doe',
    showUserMenu: true,
    showHelpButton: true,
  });

  // Mock API functions
  const mockVehicleTypesApi = async (): Promise<VehicleType[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      { id: '1', name: 'Motorcycle', wheels: 2 },
      { id: '2', name: 'Scooter', wheels: 2 },
      { id: '3', name: 'Sedan', wheels: 4 },
      { id: '4', name: 'SUV', wheels: 4 },
      { id: '5', name: 'Truck', wheels: 4 },
    ];
  };

  const mockVehicleModelsApi = async (
    typeId: string
  ): Promise<VehicleModel[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const allModels = [
      { id: '1', name: 'Honda CBR600RR', typeId: '1' },
      { id: '2', name: 'Yamaha YZF-R6', typeId: '1' },
      { id: '3', name: 'Honda PCX 150', typeId: '2' },
      { id: '4', name: 'Vespa Primavera', typeId: '2' },
      { id: '5', name: 'Toyota Camry', typeId: '3' },
      { id: '6', name: 'Honda Accord', typeId: '3' },
      { id: '7', name: 'Toyota RAV4', typeId: '4' },
      { id: '8', name: 'Honda CR-V', typeId: '4' },
      { id: '9', name: 'Ford F-150', typeId: '5' },
      { id: '10', name: 'Chevrolet Silverado', typeId: '5' },
    ];
    return allModels.filter((model) => model.typeId === typeId);
  };

  const handleFormSubmit = async (data: FormData): Promise<void> => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSubmissionData(data);
    setShowSubmissionResult(true);
  };

  const handleLogout = () => {
    alert('Logout clicked! In a real app, this would redirect to login page.');
  };

  if (demoMode === 'full') {
    return (
      <Box>
        {/* Back to Preview Button */}
        <Box position="fixed" top={16} right={16} zIndex={1300}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setDemoMode('preview')}
            size="small"
          >
            Back to Demo
          </Button>
        </Box>

        {/* Full Page Template */}
        <BookingFormPage
          companyName={templateConfig.companyName}
          userName={templateConfig.userName}
          showUserMenu={templateConfig.showUserMenu}
          showHelpButton={templateConfig.showHelpButton}
          onFormSubmit={handleFormSubmit}
          onLogout={handleLogout}
          vehicleTypesApi={mockVehicleTypesApi}
          vehicleModelsApi={mockVehicleModelsApi}
          initialFormData={{
            firstName: 'Demo',
            lastName: 'User',
          }}
        />
      </Box>
    );
  }

  if (showSubmissionResult && submissionData) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="success.main">
            🎉 Booking Submitted Successfully!
          </Typography>
          <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
            <Typography variant="h6" gutterBottom>
              Booking Details:
            </Typography>
            <Typography component="div">
              <strong>Customer:</strong> {submissionData.firstName}{' '}
              {submissionData.lastName}
              <br />
              <strong>Vehicle:</strong> {submissionData.numberOfWheels} wheels,
              Type ID: {submissionData.vehicleType}, Model ID:{' '}
              {submissionData.vehicleModel}
              <br />
              <strong>Rental Period:</strong> {submissionData.startDate} to{' '}
              {submissionData.endDate}
            </Typography>
          </Alert>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                setShowSubmissionResult(false);
                setSubmissionData(null);
              }}
            >
              Try Again
            </Button>
            <Button variant="outlined" onClick={() => setDemoMode('full')}>
              View Full Template
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Template/Page Components Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Configuration Panel */}
        <Grid xs={12} md={4}>
          <Paper sx={{ p: 3, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Template Configuration
            </Typography>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Company Name"
                value={templateConfig.companyName}
                onChange={(e) =>
                  setTemplateConfig((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
                size="small"
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                label="User Name"
                value={templateConfig.userName}
                onChange={(e) =>
                  setTemplateConfig((prev) => ({
                    ...prev,
                    userName: e.target.value,
                  }))
                }
                size="small"
              />
            </Box>

            <FormControlLabel
              control={
                <Switch
                  checked={templateConfig.showUserMenu}
                  onChange={(e) =>
                    setTemplateConfig((prev) => ({
                      ...prev,
                      showUserMenu: e.target.checked,
                    }))
                  }
                />
              }
              label="Show User Menu"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={templateConfig.showHelpButton}
                  onChange={(e) =>
                    setTemplateConfig((prev) => ({
                      ...prev,
                      showHelpButton: e.target.checked,
                    }))
                  }
                />
              }
              label="Show Help Button"
            />

            <Box mt={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setDemoMode('full')}
                size="large"
              >
                View Full Page Template
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Template Preview */}
        <Grid xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              BookingFormPage Template
            </Typography>

            <Typography variant="body1" paragraph>
              The BookingFormPage template provides a complete page layout that
              includes:
            </Typography>

            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              <Typography component="li" variant="body2" paragraph>
                <strong>Header with Navigation:</strong> Company branding, user
                menu, and help button
              </Typography>
              <Typography component="li" variant="body2" paragraph>
                <strong>Page Title & Description:</strong> Clear heading and
                instructions
              </Typography>
              <Typography component="li" variant="body2" paragraph>
                <strong>Form Wizard Integration:</strong> Embedded FormWizard
                organism
              </Typography>
              <Typography component="li" variant="body2" paragraph>
                <strong>Footer Information:</strong> Contact details and legal
                links
              </Typography>
              <Typography component="li" variant="body2" paragraph>
                <strong>Success/Error Handling:</strong> Snackbar notifications
                for form submission
              </Typography>
              <Typography component="li" variant="body2" paragraph>
                <strong>Responsive Design:</strong> Works on mobile, tablet, and
                desktop
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Template Features:</strong>
                <br />
                • Customizable company branding and user information
                <br />
                • Optional user menu and help button
                <br />
                • API integration for vehicle data
                <br />
                • Form submission handling with success/error states
                <br />• Professional layout with Material-UI theming
              </Typography>
            </Alert>

            <Box>
              <Typography variant="h6" gutterBottom>
                Usage Example:
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: 'grey.100',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}
              >
                {`<BookingFormPage
  companyName="Your Company"
  userName="Current User"
  onFormSubmit={handleSubmit}
  onLogout={handleLogout}
  vehicleTypesApi={fetchVehicleTypes}
  vehicleModelsApi={fetchVehicleModels}
  showUserMenu={true}
  showHelpButton={true}
/>`}
              </Paper>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TemplateDemo;
