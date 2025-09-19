import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  Button,
  Stack,
} from '@mui/material';
import { FormWizard, QuestionScreen } from './organisms';
import { NameFields } from './molecules';

interface FormData {
  firstName: string;
  lastName: string;
  numberOfWheels: string;
  vehicleType: string;
  vehicleModel: string;
  startDate: string;
  endDate: string;
}

const OrganismDemo: React.FC = () => {
  const [demoMode, setDemoMode] = useState<'wizard' | 'screen'>('wizard');
  const [submissionResult, setSubmissionResult] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  // Mock form submission
  const handleFormSubmit = async (data: FormData): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmissionResult(`Form submitted successfully! 
    
Data received:
• Name: ${data.firstName} ${data.lastName}
• Vehicle: ${data.numberOfWheels} wheels, Type ID: ${data.vehicleType}, Model ID: ${data.vehicleModel}
• Rental Period: ${data.startDate} to ${data.endDate}`);
    setShowResult(true);
  };

  const handleStepChange = (step: number): void => {
    console.log(`Step changed to: ${step}`);
  };

  // Demo data for QuestionScreen
  const [demoName, setDemoName] = useState({ firstName: '', lastName: '' });

  const handleDemoNext = (): void => {
    alert(
      'Next button clicked! In a real app, this would navigate to the next step.'
    );
  };

  const handleDemoBack = (): void => {
    alert(
      'Back button clicked! In a real app, this would navigate to the previous step.'
    );
  };

  if (showResult) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="success.main">
            🎉 Success!
          </Typography>
          <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
            <pre style={{ margin: 0, fontFamily: 'inherit' }}>
              {submissionResult}
            </pre>
          </Alert>
          <Button
            variant="contained"
            onClick={() => {
              setShowResult(false);
              setSubmissionResult('');
            }}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Organism Components Demo
      </Typography>

      {/* Demo Mode Selector */}
      <Box mb={4} display="flex" justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Button
            variant={demoMode === 'wizard' ? 'contained' : 'outlined'}
            onClick={() => setDemoMode('wizard')}
          >
            Form Wizard
          </Button>
          <Button
            variant={demoMode === 'screen' ? 'contained' : 'outlined'}
            onClick={() => setDemoMode('screen')}
          >
            Question Screen
          </Button>
        </Stack>
      </Box>

      {demoMode === 'wizard' ? (
        <Box>
          <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
            Complete Form Wizard
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            This demonstrates the full multi-step form with validation, API
            calls, and state management.
          </Typography>

          <FormWizard
            onSubmit={handleFormSubmit}
            onStepChange={handleStepChange}
            initialData={{
              firstName: 'John',
              lastName: 'Doe',
            }}
          />
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
            Individual Question Screen
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            This demonstrates a single question screen component that can be
            reused for any step.
          </Typography>

          <QuestionScreen
            title="Personal Information"
            subtitle="Please enter your name to get started"
            currentStep={1}
            totalSteps={5}
            onNext={handleDemoNext}
            onBack={handleDemoBack}
            showBackButton={false}
            showProgressNumbers={true}
            nextDisabled={!demoName.firstName || !demoName.lastName}
          >
            <NameFields
              firstName={demoName.firstName}
              lastName={demoName.lastName}
              onFirstNameChange={(e) =>
                setDemoName((prev) => ({ ...prev, firstName: e.target.value }))
              }
              onLastNameChange={(e) =>
                setDemoName((prev) => ({ ...prev, lastName: e.target.value }))
              }
              firstNameError={
                demoName.firstName === 'error'
                  ? 'Invalid first name'
                  : undefined
              }
              lastNameError={
                demoName.lastName === 'error' ? 'Invalid last name' : undefined
              }
            />
          </QuestionScreen>

          <Box mt={4}>
            <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                QuestionScreen Features:
              </Typography>
              <Typography variant="body2" component="div">
                • Consistent layout and styling across all steps
                <br />
                • Built-in navigation with progress indicators
                <br />
                • Error handling and validation display
                <br />
                • Responsive design for mobile and desktop
                <br />
                • Customizable titles, subtitles, and button labels
                <br />
                • Loading states and disabled states
                <br />• Flexible content area for any form components
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default OrganismDemo;
