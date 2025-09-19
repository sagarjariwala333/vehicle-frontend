import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Alert } from '@mui/material';
import QuestionScreen from './QuestionScreen';
import {
  NameFields,
  NumberOfWheelsSelector,
  VehicleTypeSelector,
  VehicleModelSelector,
  DateRangePicker,
} from '../molecules';

// Types for form data
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

interface FormErrors {
  firstName?: string;
  lastName?: string;
  numberOfWheels?: string;
  vehicleType?: string;
  vehicleModel?: string;
  startDate?: string;
  endDate?: string;
  general?: string;
}

interface FormWizardProps {
  onSubmit: (data: FormData) => Promise<void>;
  onStepChange?: (step: number) => void;
  vehicleTypesApi?: () => Promise<VehicleType[]>;
  vehicleModelsApi?: (typeId: string) => Promise<VehicleModel[]>;
  initialData?: Partial<FormData>;
}

const FormWizard: React.FC<FormWizardProps> = ({
  onSubmit,
  onStepChange,
  vehicleTypesApi,
  vehicleModelsApi,
  initialData = {},
}) => {
  // Form state
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    numberOfWheels: initialData.numberOfWheels || '',
    vehicleType: initialData.vehicleType || '',
    vehicleModel: initialData.vehicleModel || '',
    startDate: initialData.startDate || '',
    endDate: initialData.endDate || '',
  });

  // API data state
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [loadingTypes, setLoadingTypes] = useState<boolean>(false);
  const [loadingModels, setLoadingModels] = useState<boolean>(false);

  // Error and loading states
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const totalSteps = 5;

  // Mock API functions if not provided
  const defaultVehicleTypesApi = async (): Promise<VehicleType[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    return [
      { id: '1', name: 'Motorcycle', wheels: 2 },
      { id: '2', name: 'Scooter', wheels: 2 },
      { id: '3', name: 'Sedan', wheels: 4 },
      { id: '4', name: 'SUV', wheels: 4 },
      { id: '5', name: 'Truck', wheels: 4 },
    ];
  };

  const defaultVehicleModelsApi = async (
    typeId: string
  ): Promise<VehicleModel[]> => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay
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

  // Load vehicle types when number of wheels changes
  useEffect(() => {
    if (
      formData.numberOfWheels &&
      (vehicleTypesApi || defaultVehicleTypesApi)
    ) {
      setLoadingTypes(true);
      const apiCall = vehicleTypesApi || defaultVehicleTypesApi;
      apiCall()
        .then((types) => {
          setVehicleTypes(types);
          // Reset dependent fields
          setFormData((prev) => ({
            ...prev,
            vehicleType: '',
            vehicleModel: '',
          }));
          setVehicleModels([]);
        })
        .catch(() => {
          setErrors((prev) => ({
            ...prev,
            general: 'Failed to load vehicle types',
          }));
        })
        .finally(() => setLoadingTypes(false));
    }
  }, [formData.numberOfWheels, vehicleTypesApi]);

  // Load vehicle models when vehicle type changes
  useEffect(() => {
    if (formData.vehicleType && (vehicleModelsApi || defaultVehicleModelsApi)) {
      setLoadingModels(true);
      const apiCall = vehicleModelsApi || defaultVehicleModelsApi;
      apiCall(formData.vehicleType)
        .then((models) => {
          setVehicleModels(models);
          // Reset dependent field
          setFormData((prev) => ({ ...prev, vehicleModel: '' }));
        })
        .catch(() => {
          setErrors((prev) => ({
            ...prev,
            general: 'Failed to load vehicle models',
          }));
        })
        .finally(() => setLoadingModels(false));
    }
  }, [formData.vehicleType, vehicleModelsApi]);

  // Validation functions
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        break;
      case 2:
        if (!formData.numberOfWheels) {
          newErrors.numberOfWheels = 'Please select number of wheels';
        }
        break;
      case 3:
        if (!formData.vehicleType) {
          newErrors.vehicleType = 'Please select a vehicle type';
        }
        break;
      case 4:
        if (!formData.vehicleModel) {
          newErrors.vehicleModel = 'Please select a vehicle model';
        }
        break;
      case 5:
        if (!formData.startDate) {
          newErrors.startDate = 'Start date is required';
        }
        if (!formData.endDate) {
          newErrors.endDate = 'End date is required';
        }
        if (
          formData.startDate &&
          formData.endDate &&
          new Date(formData.endDate) < new Date(formData.startDate)
        ) {
          newErrors.endDate = 'End date must be after start date';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Event handlers
  const handleInputChange =
    (field: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear field-specific errors
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleNext = async (): Promise<void> => {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep === totalSteps) {
      // Submit form
      setSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Form submission error:', error);
        setErrors({ general: 'Failed to submit form. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    } else {
      // Go to next step
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handleBack = (): void => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
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
            firstNameError={errors.firstName}
            lastNameError={errors.lastName}
          />
        );
      case 2:
        return (
          <NumberOfWheelsSelector
            value={formData.numberOfWheels}
            onChange={handleInputChange('numberOfWheels')}
            error={errors.numberOfWheels}
          />
        );
      case 3:
        return (
          <VehicleTypeSelector
            value={formData.vehicleType}
            onChange={handleInputChange('vehicleType')}
            vehicleTypes={vehicleTypes}
            numberOfWheels={
              formData.numberOfWheels
                ? parseInt(formData.numberOfWheels)
                : undefined
            }
            loading={loadingTypes}
            error={errors.vehicleType}
          />
        );
      case 4:
        return (
          <VehicleModelSelector
            value={formData.vehicleModel}
            onChange={handleInputChange('vehicleModel')}
            vehicleModels={vehicleModels}
            selectedTypeId={formData.vehicleType}
            loading={loadingModels}
            error={errors.vehicleModel}
          />
        );
      case 5:
        return (
          <DateRangePicker
            startDate={formData.startDate}
            endDate={formData.endDate}
            onStartDateChange={handleInputChange('startDate')}
            onEndDateChange={handleInputChange('endDate')}
            startDateError={errors.startDate}
            endDateError={errors.endDate}
            title="Select Rental Period"
            minDate={new Date().toISOString().split('T')[0]} // Today
            maxDate={
              new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0]
            } // 1 year from now
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
          title: 'Vehicle Category',
          subtitle: 'How many wheels does your vehicle have?',
        };
      case 3:
        return {
          title: 'Vehicle Type',
          subtitle: 'What type of vehicle are you looking for?',
        };
      case 4:
        return {
          title: 'Vehicle Model',
          subtitle: 'Choose the specific model you prefer',
        };
      case 5:
        return {
          title: 'Rental Period',
          subtitle: 'When would you like to rent the vehicle?',
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const stepInfo = getStepInfo(currentStep);

  return (
    <Box>
      {errors.general && (
        <Box mb={2}>
          <Alert severity="error">{errors.general}</Alert>
        </Box>
      )}

      <QuestionScreen
        title={stepInfo.title}
        subtitle={stepInfo.subtitle}
        currentStep={currentStep}
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        nextLoading={submitting}
        nextDisabled={loadingTypes || loadingModels}
        showBackButton={currentStep > 1}
        showProgressNumbers={true}
      >
        {renderStepContent()}
      </QuestionScreen>
    </Box>
  );
};

export default FormWizard;
