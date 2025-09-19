import React, { ChangeEvent } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface DateInputProps extends Omit<TextFieldProps, 'onChange' | 'type'> {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  minDate?: string;
  maxDate?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText = '',
  required = false,
  disabled = false,
  fullWidth = true,
  minDate,
  maxDate,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      required={required}
      disabled={disabled}
      fullWidth={fullWidth}
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        min: minDate,
        max: maxDate,
      }}
      {...props}
    />
  );
};

export default DateInput;
