import React, { ChangeEvent } from 'react';
import { Box, Grid } from '@mui/material';
import { TextInput } from '../atoms';

interface ContactFieldsProps {
  email: string;
  phone: string;
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (event: ChangeEvent<HTMLInputElement>) => void;
  emailError?: string;
  phoneError?: string;
  disabled?: boolean;
}

const ContactFields: React.FC<ContactFieldsProps> = ({
  email,
  phone,
  onEmailChange,
  onPhoneChange,
  emailError,
  phoneError,
  disabled = false,
}) => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextInput
            label="Email Address"
            type="email"
            value={email}
            onChange={onEmailChange}
            error={!!emailError}
            helperText={emailError || 'Enter your email address'}
            required={true}
            disabled={disabled}
            placeholder="john.doe@example.com"
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label="Phone Number"
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            error={!!phoneError}
            helperText={phoneError || 'Enter your phone number'}
            required={true}
            disabled={disabled}
            placeholder="+1 (555) 123-4567"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactFields;
