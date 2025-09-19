import { useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import {
  TextInput,
  RadioOption,
  RadioGroupField,
  DateInput,
  PrimaryButton,
  ErrorMessage,
  ProgressDots,
  Loader,
} from './atoms';

const ComponentDemo = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(currentStep < 5 ? currentStep + 1 : 1);
    }, 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Atomic Components Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Text Inputs */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Text Inputs
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextInput
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
                required
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={lastName === 'error'}
                helperText={
                  lastName === 'error'
                    ? 'This field has an error'
                    : 'Enter your last name'
                }
                required
              />
            </Box>
          </Paper>
        </Grid>

        {/* Radio Group */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Radio Group
            </Typography>
            <RadioGroupField
              title="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              helperText="Please select your gender"
              required
            >
              <RadioOption
                value="male"
                label="Male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value)}
              />
              <RadioOption
                value="female"
                label="Female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value)}
              />
              <RadioOption
                value="other"
                label="Other"
                checked={gender === 'other'}
                onChange={(e) => setGender(e.target.value)}
              />
            </RadioGroupField>
          </Paper>
        </Grid>

        {/* Date Input */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Date Input
            </Typography>
            <DateInput
              label="Birth Date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              helperText="Select your birth date"
              maxDate="2024-12-31"
            />
          </Paper>
        </Grid>

        {/* Buttons and Error */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Buttons & Errors
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <PrimaryButton
                onClick={handleSubmit}
                loading={loading}
                endIcon={<ArrowForward />}
                fullWidth
              >
                Next Step
              </PrimaryButton>
              <ErrorMessage message="This is an error message" variant="text" />
              <ErrorMessage
                message="This is an alert error message"
                variant="alert"
              />
            </Box>
          </Paper>
        </Grid>

        {/* Progress Dots */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Progress Indicators
            </Typography>
            <ProgressDots currentStep={currentStep} totalSteps={5} />
            <ProgressDots
              currentStep={currentStep}
              totalSteps={5}
              showNumbers
              size="large"
            />
          </Paper>
        </Grid>

        {/* Loaders */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Loaders
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <Loader size={30} message="Loading vehicles..." />
              <Loader
                size={20}
                message="Fetching data..."
                showMessage={false}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ComponentDemo;
