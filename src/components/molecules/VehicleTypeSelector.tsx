import React, { ChangeEvent } from 'react';
import { Box } from '@mui/material';
import { RadioGroupField, RadioOption, ErrorMessage, Loader } from '../atoms';

interface VehicleType {
  id: string;
  name: string;
  wheels: number;
}

interface VehicleTypeSelectorProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  vehicleTypes: VehicleType[];
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  numberOfWheels?: number;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({
  value,
  onChange,
  vehicleTypes,
  loading = false,
  error,
  disabled = false,
  required = true,
  numberOfWheels,
}) => {
  // Filter vehicle types based on number of wheels if provided
  const filteredTypes = numberOfWheels
    ? vehicleTypes.filter((type) => type.wheels === numberOfWheels)
    : vehicleTypes;

  if (loading) {
    return (
      <Box>
        <Loader
          size={30}
          message="Loading vehicle types..."
          showMessage={true}
        />
      </Box>
    );
  }

  return (
    <Box>
      <RadioGroupField
        title="Vehicle Type"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={
          error ||
          `Select the type of vehicle${numberOfWheels ? ` (${numberOfWheels} wheels)` : ''}`
        }
        required={required}
        row={false}
      >
        {filteredTypes.map((type) => (
          <RadioOption
            key={type.id}
            value={type.id}
            label={type.name}
            checked={value === type.id}
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
      {filteredTypes.length === 0 && !loading && (
        <Box mt={1}>
          <ErrorMessage
            message="No vehicle types available for the selected number of wheels"
            variant="alert"
            severity="info"
          />
        </Box>
      )}
    </Box>
  );
};

export default VehicleTypeSelector;
