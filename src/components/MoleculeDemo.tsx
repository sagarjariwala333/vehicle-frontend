import React, { useState, ChangeEvent } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import {
  NameFields,
  NumberOfWheelsSelector,
  VehicleTypeSelector,
  VehicleModelSelector,
  DateRangePicker,
  NavigationBar,
} from './molecules';

// Mock data for demo
const mockVehicleTypes = [
  { id: '1', name: 'Motorcycle', wheels: 2 },
  { id: '2', name: 'Scooter', wheels: 2 },
  { id: '3', name: 'Sedan', wheels: 4 },
  { id: '4', name: 'SUV', wheels: 4 },
  { id: '5', name: 'Truck', wheels: 4 },
];

const mockVehicleModels = [
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

const MoleculeDemo: React.FC = () => {
  // Form state
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [numberOfWheels, setNumberOfWheels] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Event handlers
  const handleFirstNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
  };

  const handleWheelsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNumberOfWheels(event.target.value);
    setVehicleType(''); // Reset vehicle type when wheels change
    setVehicleModel(''); // Reset vehicle model when wheels change
  };

  const handleVehicleTypeChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setVehicleType(event.target.value);
    setVehicleModel(''); // Reset vehicle model when type changes
  };

  const handleVehicleModelChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setVehicleModel(event.target.value);
  };

  const handleStartDateChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEndDate(event.target.value);
  };

  const handleNext = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentStep(currentStep < 5 ? currentStep + 1 : 1);
    }, 1000);
  };

  const handleBack = (): void => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Molecule Components Demo
      </Typography>

      <Grid container spacing={4}>
        {/* Name Fields */}
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Name Fields
            </Typography>
            <NameFields
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={handleFirstNameChange}
              onLastNameChange={handleLastNameChange}
              firstNameError={
                firstName === 'error' ? 'Invalid first name' : undefined
              }
              lastNameError={
                lastName === 'error' ? 'Invalid last name' : undefined
              }
            />
          </Paper>
        </Grid>

        {/* Number of Wheels Selector */}
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Number of Wheels Selector
            </Typography>
            <NumberOfWheelsSelector
              value={numberOfWheels}
              onChange={handleWheelsChange}
              error={
                numberOfWheels === 'error'
                  ? 'Please select number of wheels'
                  : undefined
              }
            />
          </Paper>
        </Grid>

        {/* Vehicle Type Selector */}
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Type Selector
            </Typography>
            <VehicleTypeSelector
              value={vehicleType}
              onChange={handleVehicleTypeChange}
              vehicleTypes={mockVehicleTypes}
              numberOfWheels={
                numberOfWheels ? parseInt(numberOfWheels) : undefined
              }
              loading={false}
            />
          </Paper>
        </Grid>

        {/* Vehicle Model Selector */}
        <Grid xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Model Selector
            </Typography>
            <VehicleModelSelector
              value={vehicleModel}
              onChange={handleVehicleModelChange}
              vehicleModels={mockVehicleModels}
              selectedTypeId={vehicleType}
              loading={false}
            />
          </Paper>
        </Grid>

        {/* Date Range Picker */}
        <Grid xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Date Range Picker
            </Typography>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              title="Rental Period"
              minDate="2024-01-01"
              maxDate="2024-12-31"
            />
          </Paper>
        </Grid>

        {/* Navigation Bar */}
        <Grid xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Navigation Bar
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <NavigationBar
              currentStep={currentStep}
              totalSteps={5}
              onNext={handleNext}
              onBack={handleBack}
              nextLoading={loading}
              showProgressNumbers={true}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MoleculeDemo;
