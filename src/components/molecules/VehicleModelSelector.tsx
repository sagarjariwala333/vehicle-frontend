import React, { ChangeEvent } from 'react';
import { Box } from '@mui/material';
import { RadioGroupField, RadioOption, ErrorMessage, Loader } from '../atoms';

interface VehicleModel {
  id: string;
  type_id: string;
  model_name: string;
  registration_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface VehicleModelSelectorProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  vehicleModels: VehicleModel[];
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  selectedTypeId?: string;
}

const VehicleModelSelector: React.FC<VehicleModelSelectorProps> = ({
  value,
  onChange,
  vehicleModels,
  loading = false,
  error,
  disabled = false,
  required = true,
  selectedTypeId,
}) => {
  // Filter vehicle models based on selected type if provided
  const filteredModels = selectedTypeId
    ? vehicleModels.filter((model) => model.type_id === selectedTypeId)
    : vehicleModels;

  if (loading) {
    return (
      <Box>
        <Loader
          size={30}
          message="Loading vehicle models..."
          showMessage={true}
        />
      </Box>
    );
  }

  return (
    <Box>
      <RadioGroupField
        title="Vehicle Model"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error || 'Select the specific model of your vehicle'}
        required={required}
        row={false}
      >
        {filteredModels.map((vehicle) => (
          <RadioOption
            key={vehicle.id}
            value={vehicle.id}
            label={`${vehicle.model_name} (${vehicle.registration_number})`}
            checked={value === vehicle.id}
            onChange={onChange}
            disabled={disabled}
          />
        ))}
      </RadioGroupField>
      {error && (
        <Box mt={1}>
          <ErrorMessage message={error} variant="text" />
        </Box>
      )}
      {filteredModels.length === 0 && !loading && selectedTypeId && (
        <Box mt={1}>
          <ErrorMessage
            message="No vehicles available for the selected dates and type. Please try different dates or vehicle type."
            variant="alert"
            severity="info"
          />
        </Box>
      )}
      {!selectedTypeId && (
        <Box mt={1}>
          <ErrorMessage
            message="Please select a vehicle type first"
            variant="alert"
            severity="warning"
          />
        </Box>
      )}
    </Box>
  );
};

export default VehicleModelSelector;
