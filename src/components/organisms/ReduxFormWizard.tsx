import React, { useEffect } from 'react';
import { Box, Alert, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  updateFormField,
  setFormErrors,
  nextStep,
  previousStep,
  resetForm,
  resetVehicleType,
  resetVehicleModel,
  selectFormData,
  selectFormErrors,
  selectCurrentStep,
  selectVehicleTypesLoading,
  selectVehicleModelsLoading,
  selectFilteredVehicleTypes,
  selectFilteredVehicleModels,
  selectIsSubmitting,
} from '../../store';
import {
  fetchVehicleTypes,
  fetchVehicleModels,
  fetchAvailableVehicleModels,
} from '../../store/slices/vehiclesSlice';
import { setSubmitting, addNotification } from '../../store/slices/uiSlice';
import { submitBooking } from '../../services/bookingService';
import QuestionScreen from './QuestionScreen';
import {
  NameFields,
  ContactFields,
  NumberOfWheelsSelector,
  VehicleTypeSelector,
  VehicleModelSelector,
  DateRangePicker,
} from '../molecules';
import { FormData } from '../../store/types';

interface ReduxFormWizardProps {
  onSubmit?: (data: FormData) => Promise<void>;
  onStepChange?: (step: number) => void;
}

const ReduxFormWizard: React.FC<ReduxFormWizardProps> = ({
  onSubmit,
  onStepChange,
}) => {
  const dispatch = useAppDispatch();

  // Selectors
  const formData = useAppSelector(selectFormData);
  const formErrors = useAppSelector(selectFormErrors);
  const currentStep = useAppSelector(selectCurrentStep);
  const isSubmitting = useAppSelector(selectIsSubmitting);

  const vehicleTypesLoading = useAppSelector(selectVehicleTypesLoading);
  const vehicleModelsLoading = useAppSelector(selectVehicleModelsLoading);

  // Filtered data based on form selections
  const filteredVehicleTypes = useAppSelector(
    selectFilteredVehicleTypes(
      formData.numberOfWheels ? parseInt(formData.numberOfWheels) : undefined
    )
  );
  const filteredVehicleModels = useAppSelector(
    selectFilteredVehicleModels(formData.vehicleType)
  );

  const totalSteps = 6;

  // Load vehicle types when number of wheels changes
  useEffect(() => {
    if (formData.numberOfWheels) {
      const wheels = parseInt(formData.numberOfWheels);
      dispatch(fetchVehicleTypes(wheels));
      dispatch(resetVehicleType());
    }
  }, [formData.numberOfWheels, dispatch]);

  // Reset vehicle selections when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      // Reset vehicle selections when dates change
      dispatch(resetVehicleType());
    }
  }, [formData.startDate, formData.endDate, dispatch]);

  // Load vehicle models when vehicle type changes
  useEffect(() => {
    if (formData.vehicleType) {
      // If dates are selected, fetch only available vehicles
      if (formData.startDate && formData.endDate) {
        dispatch(
          fetchAvailableVehicleModels({
            typeId: formData.vehicleType,
            startDate: formData.startDate,
            endDate: formData.endDate,
          })
        );
      } else {
        // Otherwise fetch all vehicles of this type
        dispatch(fetchVehicleModels(formData.vehicleType));
      }
      dispatch(resetVehicleModel());
    }
  }, [formData.vehicleType, formData.startDate, formData.endDate, dispatch]);

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // Validation functions
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          errors.lastName = 'Last name is required';
        }
        break;
      case 2:
        if (!formData.email.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = 'Please enter a valid email address';
        }
        if (!formData.phone.trim()) {
          errors.phone = 'Phone number is required';
        } else if (!/^\+?[\d\s\-()]{10,20}$/.test(formData.phone)) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      case 3:
        if (!formData.startDate) {
          errors.startDate = 'Start date is required';
        }
        if (!formData.endDate) {
          errors.endDate = 'End date is required';
        }
        if (
          formData.startDate &&
          formData.endDate &&
          new Date(formData.endDate) < new Date(formData.startDate)
        ) {
          errors.endDate = 'End date must be after start date';
        }
        break;
      case 4:
        if (!formData.numberOfWheels) {
          errors.numberOfWheels = 'Please select number of wheels';
        }
        break;
      case 5:
        if (!formData.vehicleType) {
          errors.vehicleType = 'Please select a vehicle type';
        }
        break;
      case 6:
        console.log('Step 6 validation - vehicleModel:', formData.vehicleModel);
        if (!formData.vehicleModel) {
          errors.vehicleModel = 'Please select a vehicle model';
        }
        break;
    }

    dispatch(setFormErrors(errors));
    return Object.keys(errors).length === 0;
  };

  // Event handlers
  const handleInputChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Field changed:', field, 'Value:', event.target.value);
      dispatch(updateFormField({ field, value: event.target.value }));
    };

  const handleNext = async (): Promise<void> => {
    if (!validateStep(currentStep)) {
      console.log('validation failed....');
      return;
    }

    if (currentStep === totalSteps) {
      // Submit form
      dispatch(setSubmitting(true));
      try {
        if (onSubmit) {
          await onSubmit(formData);
        } else {
          // Submit to backend API
          const result = await submitBooking(formData);
          console.log('Booking created:', result.booking);
        }

        dispatch(
          addNotification({
            message: 'Booking created successfully!',
            type: 'success',
          })
        );

        // Reset form after successful submission
        dispatch(resetForm());
      } catch (error: any) {
        console.error('Form submission error:', error);
        const errorMessage =
          error.message || 'Failed to submit booking. Please try again.';

        dispatch(
          setFormErrors({
            general: errorMessage,
          })
        );
        dispatch(
          addNotification({
            message: errorMessage,
            type: 'error',
          })
        );
      } finally {
        dispatch(setSubmitting(false));
      }
    } else {
      // Go to next step
      dispatch(nextStep());
    }
  };

  const handleBack = (): void => {
    dispatch(previousStep());
  };

  // Render current step content
  const renderStepContent = (): React.ReactNode => {
    switch (currentStep) {
      case 1:
        return (
          <NameFields
            firstName={formData.firstName}
            lastName={formData.lastName}
            onFirstNameChange={handleInputChange('firstName')}
            onLastNameChange={handleInputChange('lastName')}
            firstNameError={formErrors.firstName}
            lastNameError={formErrors.lastName}
          />
        );
      case 2:
        return (
          <ContactFields
            email={formData.email}
            phone={formData.phone}
            onEmailChange={handleInputChange('email')}
            onPhoneChange={handleInputChange('phone')}
            emailError={formErrors.email}
            phoneError={formErrors.phone}
          />
        );
      case 3:
        return (
          <DateRangePicker
            startDate={formData.startDate}
            endDate={formData.endDate}
            onStartDateChange={handleInputChange('startDate')}
            onEndDateChange={handleInputChange('endDate')}
            startDateError={formErrors.startDate}
            endDateError={formErrors.endDate}
            title="Select Rental Period"
            minDate={new Date().toISOString().split('T')[0]}
            maxDate={
              new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0]
            }
          />
        );
      case 4:
        return (
          <NumberOfWheelsSelector
            value={formData.numberOfWheels}
            onChange={handleInputChange('numberOfWheels')}
            error={formErrors.numberOfWheels}
          />
        );
      case 5:
        return (
          <VehicleTypeSelector
            value={formData.vehicleType}
            onChange={handleInputChange('vehicleType')}
            vehicleTypes={filteredVehicleTypes}
            numberOfWheels={
              formData.numberOfWheels
                ? parseInt(formData.numberOfWheels)
                : undefined
            }
            loading={vehicleTypesLoading}
            error={formErrors.vehicleType}
          />
        );
      case 6:
        return (
          <VehicleModelSelector
            value={formData.vehicleModel}
            onChange={handleInputChange('vehicleModel')}
            vehicleModels={filteredVehicleModels}
            selectedTypeId={formData.vehicleType}
            loading={vehicleModelsLoading}
            error={formErrors.vehicleModel}
          />
        );
      default:
        return null;
    }
  };

  // Get step titles and subtitles
  const getStepInfo = (step: number) => {
    switch (step) {
      case 1:
        return {
          title: 'Personal Information',
          subtitle: 'Please enter your name to get started',
        };
      case 2:
        return {
          title: 'Contact Information',
          subtitle: 'Please provide your contact details',
        };
      case 3:
        return {
          title: 'Rental Period',
          subtitle: 'When would you like to rent the vehicle?',
        };
      case 4:
        return {
          title: 'Vehicle Category',
          subtitle: 'How many wheels does your vehicle have?',
        };
      case 5:
        return {
          title: 'Vehicle Type',
          subtitle: 'What type of vehicle are you looking for?',
        };
      case 6:
        return {
          title: 'Vehicle Model',
          subtitle: 'Choose from available vehicles for your dates',
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const stepInfo = getStepInfo(currentStep);

  return (
    <Box>
      {formErrors.general && (
        <Box mb={2}>
          <Alert severity="error">{formErrors.general}</Alert>
        </Box>
      )}

      <QuestionScreen
        title={stepInfo.title}
        subtitle={stepInfo.subtitle}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        nextLoading={isSubmitting}
        nextDisabled={vehicleTypesLoading || vehicleModelsLoading}
        showBackButton={currentStep > 1}
        showProgressNumbers={true}
      >
        {renderStepContent()}
      </QuestionScreen>
    </Box>
  );
};

export default ReduxFormWizard;
