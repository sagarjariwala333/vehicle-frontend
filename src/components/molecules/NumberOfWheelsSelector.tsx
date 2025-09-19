import React, { ChangeEvent } from 'react';
import { Box } from '@mui/material';
import { RadioGroupField, RadioOption, ErrorMessage } from '../atoms';

interface NumberOfWheelsSelectorProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

const NumberOfWheelsSelector: React.FC<NumberOfWheelsSelectorProps> = ({
  value,
  onChange,
  error,
  disabled = false,
  required = true,
}) => {
  const wheelOptions = [
    { value: '2', label: '2 Wheels (Motorcycle/Scooter)' },
    { value: '4', label: '4 Wheels (Car/Truck)' },
  ];

  return (
    <Box>
      <RadioGroupField
        title="Number of Wheels"
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error || 'Select the number of wheels for your vehicle'}
        required={required}
        row={false}
      >
        {wheelOptions.map((option) => (
          <RadioOption
            key={option.value}
            value={option.value}
            label={option.label}
            checked={value === option.value}
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
    </Box>
  );
};

export default NumberOfWheelsSelector;
