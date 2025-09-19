import React, { ChangeEvent } from 'react';
import { Box, Stack } from '@mui/material';
import { TextInput, ErrorMessage } from '../atoms';

interface NameFieldsProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLastNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  firstNameError?: string;
  lastNameError?: string;
  disabled?: boolean;
  required?: boolean;
}

const NameFields: React.FC<NameFieldsProps> = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  firstNameError,
  lastNameError,
  disabled = false,
  required = true,
}) => {
  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ width: '100%' }}
      >
        <Box sx={{ flex: 1 }}>
          <TextInput
            label="First Name"
            value={firstName}
            onChange={onFirstNameChange}
            error={!!firstNameError}
            helperText={firstNameError}
            placeholder="Enter your first name"
            required={required}
            disabled={disabled}
            fullWidth
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={onLastNameChange}
            error={!!lastNameError}
            helperText={lastNameError}
            placeholder="Enter your last name"
            required={required}
            disabled={disabled}
            fullWidth
          />
        </Box>
      </Stack>
      {(firstNameError || lastNameError) && (
        <Box mt={1}>
          {firstNameError && (
            <ErrorMessage message={firstNameError} variant="text" />
          )}
          {lastNameError && (
            <ErrorMessage message={lastNameError} variant="text" />
          )}
        </Box>
      )}
    </Box>
  );
};

export default NameFields;
